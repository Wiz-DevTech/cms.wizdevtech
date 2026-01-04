// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔐 Login attempt:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            role: true
          }
        })

        console.log('👤 User found:', user ? 'YES' : 'NO')
        
        if (!user || !user.password) {
          console.log('❌ User not found or no password')
          return null
        }

        console.log('🔑 Comparing passwords...')
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )
        
        console.log('🔑 Password match:', isCorrectPassword ? 'YES' : 'NO')

        if (!isCorrectPassword) {
          console.log('❌ Password incorrect')
          return null
        }

        if (!user.isActive) {
          console.log('❌ User inactive')
          return null
        }

        console.log('✅ Login successful for:', user.email)
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.name,
          permissions: user.role.permissions.split(',').filter(p => p.trim())
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string
        session.user.permissions = token.permissions as string[]
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }