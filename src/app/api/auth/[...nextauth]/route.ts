
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            role: true  // ✅ Just include the role, no nested permissions
          }
        })

        if (!user || !user.password) {
          return null  // Return null instead of throwing
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          return null  // Return null instead of throwing
        }

        if (!user.isActive) {
          return null  // Check if user is active
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.name,
          permissions: user.role.permissions.split(',').filter(p => p.trim())  // ✅ Parse the string
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
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