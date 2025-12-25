import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server';

export const authConfig = {
    pages:{
        signIn: '/login',
        error: '/auth/error',
    },
    callbacks:{
        authorized({auth, request: {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if(isOnDashboard && !isLoggedIn){
                return false;   // redirect unauthenticated user to login page
            }
            if(!isOnDashboard && isLoggedIn){
                return NextResponse.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers:[], // Add providers with an empty array for now
}satisfies NextAuthConfig;