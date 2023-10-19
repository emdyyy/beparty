import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className + " bg-bg"}>
        <Toaster position="bottom-center" />
        <div className="max-w-sm mx-auto p-5">
          <h1 className="font-bold text-2xl text-center p-3">
            BeParty <span className="text-sm font-normal">Alpha</span>
          </h1>
          {children}
        </div>
      </body>
    </html>
  );
}
