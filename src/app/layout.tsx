import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/redux/provider";
import Navigation from "@/components/navigation";
import { Toaster } from "sonner";
import { AuroraBackground } from "@/components/aurora-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODO List",
  description:
    "A simple and intuitive Todo application where users can create tasks with a short description, start time, end time, and priority level. Users can view a list of all their todos, edit or delete them when needed, and mark tasks as done using a checkbox. A dedicated button allows users to uncheck all completed todos with a single click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col w-full">
              <Navigation />
              <main className="flex-1 container mx-auto p-4 bg-transparent">
                {children}
              </main>
              <AuroraBackground
                className="absolute inset-0 z-50"
                style={{ zIndex: -1 }}
              />
              <Toaster richColors />
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
