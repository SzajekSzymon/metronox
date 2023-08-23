import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainNav } from "./src/organisms/MainNav/MainNav";
import ReduxProvider from "./src/store/ReduxProvider";
import AuthProvider from "./src/context/AuthProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metronox - Home",
  description: "Advance metronome for professional musicians",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <ReduxProvider>
            <MainNav />
            {children}
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
