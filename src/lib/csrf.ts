// src/lib/csrf.ts
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const CSRF_TOKEN_LENGTH = 32
const CSRF_COOKIE_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'

// In-memory store for CSRF tokens (in production, use Redis or database)
const csrfTokens = new Map<string, { token: string; expires: number }>()

// Clean up expired tokens every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [sessionId, data] of csrfTokens.entries()) {
    if (data.expires < now) {
      csrfTokens.delete(sessionId)
    }
  }
}, 5 * 60 * 1000)

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(sessionId?: string): string {
  const token = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex')
  
  // If sessionId provided, store in memory map
  if (sessionId) {
    const expires = Date.now() + (60 * 60 * 1000) // 1 hour
    csrfTokens.set(sessionId, { token, expires })
  }
  
  return token
}

/**
 * Set CSRF token in cookies
 */
export async function setCSRFToken(): Promise<string> {
  const token = generateCSRFToken()
  const cookieStore = await cookies()
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  })
  
  return token
}

/**
 * Get CSRF token from cookies
 */
export async function getCSRFToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(CSRF_COOKIE_NAME)?.value
}

/**
 * Validate CSRF token from session-based store
 */
export function validateCSRFTokenBySession(sessionId: string, token: string): boolean {
  const storedData = csrfTokens.get(sessionId)
  
  if (!storedData) {
    return false
  }
  
  if (storedData.expires < Date.now()) {
    csrfTokens.delete(sessionId)
    return false
  }
  
  if (storedData.token !== token) {
    return false
  }
  
  // Remove token after successful validation (one-time use)
  csrfTokens.delete(sessionId)
  return true
}

/**
 * Validate CSRF token from request (cookie-based)
 */
export async function validateCSRFToken(request: Request): Promise<boolean> {
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value
  
  if (!cookieToken) {
    return false
  }
  
  // Check header first
  const headerToken = request.headers.get(CSRF_HEADER_NAME)
  if (headerToken) {
    return headerToken === cookieToken
  }
  
  // Check form data
  const formToken = await getTokenFromFormData(request)
  if (formToken) {
    return formToken === cookieToken
  }
  
  return false
}

/**
 * Extract CSRF token from form data (helper function)
 */
async function getTokenFromFormData(request: Request): Promise<string | null> {
  try {
    const contentType = request.headers.get('content-type')
    if (contentType?.includes('application/x-www-form-urlencoded') || 
        contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      return formData.get('csrf_token') as string
    }
  } catch {
    // Ignore parsing errors
  }
  return null
}

/**
 * Get CSRF token from NextRequest (for middleware)
 */
export async function getCSRFTokenFromRequest(request: NextRequest): Promise<string | null> {
  // Check header first
  const headerToken = request.headers.get(CSRF_HEADER_NAME)
  if (headerToken) {
    return headerToken
  }
  
  // Check body for form submissions
  try {
    const contentType = request.headers.get('content-type')
    if (contentType?.includes('application/x-www-form-urlencoded') || 
        contentType?.includes('multipart/form-data')) {
      const formData = await request.formData()
      return formData.get('csrf_token') as string
    }
  } catch {
    // If parsing fails, continue
  }
  
  return null
}

/**
 * Middleware to require CSRF token for state-changing requests
 */
export async function requireCSRFToken(request: Request): Promise<Response | null> {
  const method = request.method.toUpperCase()
  
  // Only check CSRF for state-changing methods
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    const isValid = await validateCSRFToken(request)
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid CSRF token' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
  
  return null
}

/**
 * Higher-order function to wrap API handlers with CSRF protection
 */
export function withCSRFProtection(
  handler: (request: NextRequest, context: any) => Promise<Response>
) {
  return async (request: NextRequest, context: any) => {
    const sessionId = request.headers.get('x-session-id')
    
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 401 }
      )
    }
    
    // For GET requests, generate and return CSRF token
    if (request.method === 'GET') {
      const token = generateCSRFToken(sessionId)
      return NextResponse.json({
        csrfToken: token
      })
    }
    
    // For state-changing requests, validate CSRF token
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const csrfToken = await getCSRFTokenFromRequest(request)
      
      if (!csrfToken) {
        return NextResponse.json(
          { error: "CSRF token required" },
          { status: 403 }
        )
      }
      
      if (!validateCSRFTokenBySession(sessionId, csrfToken)) {
        return NextResponse.json(
          { error: "Invalid CSRF token" },
          { status: 403 }
        )
      }
    }
    
    return await handler(request, context)
  }
}