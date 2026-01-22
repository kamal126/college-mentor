import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./lib/connectDB";
import { User } from "./models/user.model";

async function getUser(email: string) {
  await connectDB();
  return await User.findOne({ email });
}

// export const { handlers, auth, signOut, signIn } = NextAuth({
//   pages: {
//     error: "/login",
//   },

//   session: { strategy: "jwt" },

//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         const user = await getUser(credentials!.email as string);
//         if (!user) return null;

//         const match = await bcrypt.compare(
//           credentials!.password as string,
//           user.password
//         );

//         if (!match) return null;

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           username: user.username,
//           isMentor: user.isMentor,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.isMentor = user.isMentor;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id as string;
//       session.user.username = token.username as string;
//       session.user.isMentor = token.isMentor as boolean;
//       return session;
//     },
//   },
// })

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await getUser(credentials.email);
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          avatar: user.avatar,
          isMentor: user.isMentor,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.fullName = user.fullName;
        token.avatar = user.avatar;
        token.isMentor = user.isMentor;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.fullName = token.fullName as string;
        session.user.avatar = token.avatar as string;
        session.user.isMentor = token.isMentor as boolean;
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};




// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import connectDB from "./lib/connectDB";
// import { z } from "zod";
// import { User } from "./models/user.model";

// async function getUser(email: string) {
//   await connectDB();
//   const user = await User.findOne({ email });
//   return user;
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const parsed = z
//           .object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           })
//           .safeParse(credentials);

//         if (!parsed.success) return null;

//         const { email, password } = parsed.data;
//         const user = await getUser(email);
//         if (!user) return null;

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) return null;

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.fullName ?? user.email,
//           username: user.username,
//           isMentor: user.isMentor,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.isMentor = Boolean(user.isMentor);
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.username = token.username as string;
//         session.user.isMentor = token.isMentor as boolean;
//       }
//       return session;
//     },
//   },
//   pages: {
//     error: "/test",
//   },
// });


// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import connectDB from "./lib/connectDB";
// import {z} from 'zod';
// import { User } from "./models/user.model";

// async function getUser(email: string) {
//   await connectDB();
//   try {
//     const user = await User.findOne({ email });
//     return user;
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// export const {auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       credentials:{
//         email: {label:"Email", type:"email"},
//         password: {label:"Password", type:"password"}
//       },
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ 
//             email: z.string().email(), 
//             password: z.string().min(6) 
//           })
//           .safeParse(credentials);

//         if (!parsedCredentials.success) return null;

//         const { email, password } = parsedCredentials.data;
//         const user = await getUser(email);
//         if (!user) return null;

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) return null;

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.fullName ?? user.email,
//           username: user.username,
//           isMentor: user.isMentor,
//         };
//       },
//     }),
//   ],

//   callbacks:{
//     async jwt({token, user}){
//       if(user){
//         token.id = user.id;
//         token.username = user.username;
//         token.isMentor = Boolean(user.isMentor);
//       }
//       return token;
//     },

//     async session({session, token}){
//       if(session.user){
//         session.user.id = token.id as string;
//         session.user.username = token.username as string;
//         session.user.isMentor = token.isMentor as boolean;
//       }
//       return session;
//     },
//   },
// });


// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       credentials:{
//         email: {label:"Email", type:"email", placeholder:"kamal@gmail.com"},
//         password: {label:"Password", type:"password", placeholder:"******"}
//       },
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ 
//             email: z.string().email(), 
//             password: z.string().min(6) 
//           })
//           .safeParse(credentials);

//         if(parsedCredentials.success){
//             const {email, password} = parsedCredentials.data;
//             const user = await getUser(email);

//             if(!user) return null;

//             const passwordMatch = await bcrypt.compare(password, user.password);
//             if(!passwordMatch) return null;

//             if(passwordMatch){ 
//               console.log(user); 
//               return {
//                 id: user._id.toString(),
//                 email:user.email,
//                 name:user.fullName ?? user.email,
//                 username: user.username,
//                 isMentor: user.isMentor,
//               };
//             }
//         }
//         console.log('Invalid credentials');
//         return null;
//       },
//     }),
//   ],

//   callbacks:{
//     async jwt({token, user}){
//       if(user){
//         token.id = user.id;
//         token.username = user.username;
//         token.isMentor = Boolean(user.isMentor)
//       }
//       return token;
//     },

//     async session({session, token}){
//       if(session.user){
//         session.user.id = token.id as string;
//         token.username = token.username as string;
//         session.user.isMentor = token.isMentor as boolean
//       }
//       return session;
//     },
//   },
// });

// import NextAuth from 'next-auth'
// import Credentials from 'next-auth/providers/credentials'
// import { User } from './models/user.model'

// export const {handlers, signIn, signOut, auth} = NextAuth({
//     providers: [
//         Credentials({
//             credentials:{
//                 email:{type:"email", label:"Email", placeholder:"kamal@gmail.com"},
//                 password:{type:"password", label:"Password", placeholder:"******"},
//             },
//             authorize: async (credentials):Promise<any> =>{

//                 const user = User.find({email: credentials?.email});

//                 if(!user){
//                     throw new Error("Invalid credentials.");
//                 }

//                 return user.select('-password');
//             },
//         })
//     ],
//     // callbacks:({

//     // })
// })
