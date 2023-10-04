import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "@/libs/prisma-client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prismaClient.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) return null;

          const isPasswordMatch = await bcrypt.compare(
            credentials?.password as string,
            user.password as string
          );

          if (!isPasswordMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username as string,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ token, session }) {
      const user = await prismaClient.user.findUnique({
        where: {
          email: token.email as string,
        },
      });

      session.user.id = token.id as string;
      if (!user?.username) {
        const username = user?.email?.split("@")[0] as string;
        session.user.username = username;
        await prisma?.user.update({
          where: {
            email: user?.email as string,
          },
          data: {
            username,
          },
        });
      }
      session.user.username = user?.username as string;

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
