import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptVault | The AI Prompt Marketplace",
  description: "Buy and sell high-quality AI prompts for ChatGPT, Midjourney, Claude, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-h-screen lg:pl-64 overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
