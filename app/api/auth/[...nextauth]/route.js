
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";
import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Guest",
      credentials: {},
      async authorize() {
        return {
          id: uuidv4(),
          name: "Guest User",
          email: `guest-${uuidv4()}@guest.local`,
          role: "guest",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDB();

        if (!user.email) return false;

        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
          });
          await dbUser.save();
        }
        user.name = dbUser.username;
        user.role = "user";
        user.id = dbUser._id.toString();
      }
      return true;
    },

    async jwt({ token, user }) {
      // Runs only on sign in
      if (user) {
        token.id = user.id ?? uuidv4();
        token.role = user.role ?? "user";
        token.email = user.email ?? null;
      }

      // 🔑 Always fetch latest username from DB
      if (token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.name = dbUser.username; // ✅ keep username in sync
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name, // ✅ now reflects latest db username
        role: token.role,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
