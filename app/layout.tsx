import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Samer Alyaghn - Frontend Developer",
  description: "Personal portfolio of Samer Alyaghn, a frontend developer specializing in React, Next.js, and modern web technologies.",
  keywords: ["frontend developer", "react", "next.js", "typescript", "portfolio"],
  authors: [{ name: "Samer Alyaghn" }],
  creator: "Samer Alyaghn",
  openGraph: {
    title: "Samer Alyaghn - Frontend Developer",
    description: "Personal portfolio of Samer Alyaghn, a frontend developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samer Alyaghn - Frontend Developer",
    description: "Personal portfolio of Samer Alyaghn, a frontend developer specializing in React, Next.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
