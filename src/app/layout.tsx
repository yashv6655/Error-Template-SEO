import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PHProvider } from "@/components/providers/posthog-provider";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IssueGen - SEO-Optimized GitHub Issue Templates",
  description: "Generate professional GitHub issue templates optimized for SEO and developer productivity. Create bug reports, feature requests, and performance issue templates with AI.",
  keywords: ["GitHub", "issue templates", "SEO", "developer tools", "bug reports", "feature requests"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <PHProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </PHProvider>
      </body>
    </html>
  );
}