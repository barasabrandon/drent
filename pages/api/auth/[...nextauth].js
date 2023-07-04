import clientPromise from '@/lib/mongodb';
import { User } from '@/models/User';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.MAIL_FROM_ADDRESS,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn(user, account, profile) {
      console.log('Sign in successfull.');
    },
    async session(session, user) {
      return session;
    },
  },
});
