import type { Metadata } from "next";
import {  Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { ThemeProvider } from "@/providers/theme-providers";
import { Toaster } from "sonner";


const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Social Sphere AI",
  description: "Automate DMs and comments on instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={jakarta.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
        <Toaster/>
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
