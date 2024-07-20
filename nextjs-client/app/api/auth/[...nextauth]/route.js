import User from "@/modals/User";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connect();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not exist!");
          }
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isCorrectPassword) {
            return user;
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "github") {
        try {
          await connect();
          console.log("GitHub user:", user);

          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.name,
              imageUrl: user?.image,
            });
            await newUser.save();
            console.log("New GitHub user created:", newUser);
          } else {
            console.log("Existing GitHub user:", existingUser);
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
      if (account?.provider === "google") {
        try {
          await connect();
          console.log("Google user:", user);
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.name,
              imageUrl: user?.image,
            });
            await newUser.save();
            console.log("New Google user created:", newUser);
          } else {
            console.log("Existing Google user:", existingUser);
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        delete token.user.password;
        session.user = token.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
