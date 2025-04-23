import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
        <div className="flex justify-center">
          <header className="max-w-7xl container">
            <h1 className="text-6xl font-fraunces font-black text-orange-600">
              Stash
            </h1>
            <h2 className="text-4xl pb-24 pt-4 font-fraunces">
              The best hotels are independent hotels.
            </h2>
          </header>
        </div>
        {children}
      </body>
    </html>
  );
}
