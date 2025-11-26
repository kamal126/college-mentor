import { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "AI-Mentor",
  description: "Dive into our comprehensive music courses and transform your musical journey today.",
};




export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
