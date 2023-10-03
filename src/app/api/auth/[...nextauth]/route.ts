import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "@/libs/prisma-client";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        try {
          const user = await prismaClient.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) throw Error("Pengguna tidak ditemukan!");

          const isPasswordMatch = await bcrypt.compare(
            password,
            user.password as string
          );

          if (!isPasswordMatch) throw Error("Password salah!");

          return {
            id: user.id,
            name: user.username,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          const err = error as Error;
          return NextResponse.json(err, { status: 500 });
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ token, session }) {
      session.user.id = token.id as string;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
