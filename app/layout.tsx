import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/themeButton";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Mentor",
  description:
    "Dive into our comprehensive music courses and transform your musical journey today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="hidden md:block fixed top-4 right-4 z-50">
              <ModeToggle />
            </div>

            <Toaster position="top-right" />

            <main className="w-full">{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
