import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeParty",
  description: "Podziel się momentem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={font.className + " bg-bg text-white"}>
        <Toaster position="top-center" />
        <div className="max-w-sm mx-auto p-3 min-h-screen flex flex-col">
          <div className="py-5">
            <h1 className="font-bold text-3xl text-center">18stka Mileny </h1>
            <p className="text-sm font-normal text-center">BeParty</p>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
