import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email =
          typeof credentials.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        if (!user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (!account || account.provider === "credentials") {
        return true;
      }

      const email =
        typeof profile?.email === "string"
          ? profile.email.toLowerCase()
          : user.email?.toLowerCase();

      if (!email) {
        return false;
      }

      const existingAccount = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
      });

      if (existingAccount) {
        user.id = existingAccount.userId;
        return true;
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      const dbUser =
        existingUser ??
        (await prisma.user.create({
          data: {
            email,
            name: user.name,
            gameSave: {
              create: {
                upgradeLevels: {},
                achievements: [],
              },
            },
          },
        }));

      await prisma.account.create({
        data: {
          userId: dbUser.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state:
            typeof account.session_state === "string"
              ? account.session_state
              : null,
        },
      });

      user.id = dbUser.id;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});
