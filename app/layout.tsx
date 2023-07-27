import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainNav } from "./src/organisms/MainNav/MainNav";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metronox - Home",
  description: "Advance metronome for professional musicians",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNav />
        {children}
      </body>
    </html>
  );
}
