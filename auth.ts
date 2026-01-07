import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./lib/connectDB";
import {z} from 'zod';
import { User } from "./models/user.model";

async function getUser(email: string) {
  await connectDB();
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials:{
        email: {label:"Email", type:"email"},
        password: {label:"Password", type:"password"}
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6) 
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName ?? user.email,
          username: user.username,
          isMentor: user.isMentor,
        };
      },
    }),
  ],

  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id = user.id;
        token.username = user.username;
        token.isMentor = Boolean(user.isMentor);
      }
      return token;
    },

    async session({session, token}){
      if(session.user){
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.isMentor = token.isMentor as boolean;
      }
      return session;
    },
  },
});


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
