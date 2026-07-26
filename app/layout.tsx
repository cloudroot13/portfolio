import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Gabriel Cavalcanti — Desenvolvedor de Software",
  description: "Portfólio de Gabriel Cavalcanti Amaral, estudante de Ciência da Computação e desenvolvedor.",
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
