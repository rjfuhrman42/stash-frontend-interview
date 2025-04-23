import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Hotel, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Rewards",
  description: "The best hotels are independent hotels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} antialiased bg-main-background`}
      >
        <div className="flex justify-center p-4">
          <header className="max-w-7xl container">
            <div className="flex items-baseline gap-2">
              <h1 className="text-6xl font-fraunces font-black text-orange-600">
                Stash
              </h1>
              <div className="flex">
                <Hotel className="text-orange-600" />
                <Palmtree className="text-orange-600" />
              </div>
            </div>
            <h2 className="text-4xl py-4 font-fraunces">
              The best hotels are independent hotels.
            </h2>
            <Button variant="link" asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </header>
        </div>
        {children}
      </body>
    </html>
  );
}
