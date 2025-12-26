import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isni Skara | AI Automation & Vibe Code Specialist",
  description:
    "AI Backend Infrastructure Engineer with 5+ years experience in AI systems, workflow automation, data processing, and LLM integration. Hybrid agent specialist combining human judgment with AI automation.",
  keywords: [
    "AI Automation",
    "Vibe Code",
    "LLM",
    "AI Agents",
    "Data Engineering",
    "Python",
    "Workflow Orchestration",
    "n8n",
    "RAG",
    "Backend Engineering",
  ],
  authors: [{ name: "Isni Skara" }],
  openGraph: {
    title: "Isni Skara | AI Automation & Vibe Code Specialist",
    description:
      "Where human reasoning meets autonomous systems. AI Backend Infrastructure Engineer specializing in hybrid agent workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#0a0a0f] text-white`}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" />
        {/* Scan lines */}
        <div className="scan-lines" />
        {children}
      </body>
    </html>
  );
}
