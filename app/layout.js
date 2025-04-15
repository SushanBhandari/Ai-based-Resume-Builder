import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import TopNav from "@/components/nav/top-nav";
import { ResumeProvider } from "@/context/resume";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ai-based Resume Builder",
  description: "A ai based resume builder for joob seekers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ResumeProvider>
              <TopNav />
              {children}
            </ResumeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
