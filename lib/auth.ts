import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import db from '@/lib/db'

export const config = {
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id
        const saltRounds = 10
        const token = crypto.randomUUID()
        const hashedToken = await bcrypt.hash(token, saltRounds)

        const existingProfile = await db.profile.findUnique({
          where: {
            userId: user.id,
          },
        })

        if (!existingProfile) {
          await db.profile.create({
            data: {
              userId: user.id,
              key: hashedToken,
            },
          })
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
