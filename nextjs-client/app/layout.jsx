import "./globals.css";
import { Inter } from "next/font/google";

// theme
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// next auth
import { getServerSession } from "next-auth";
import SessionProvider from "./auth/SessionProvider";

import Navbar from "@/components/navbar/navbar";
import ReduxProvider from "./store/provider/ReduxProvider";

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Navbar />
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// from ui branch
