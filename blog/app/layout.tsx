import type { Metadata } from "next";
import { JetBrains_Mono, Source_Serif_4, VT323, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const vt323 = VT323({
  variable: "--font-display-next",
  subsets: ["latin"],
  weight: "400",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-body-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-heading-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Akhil's Blog",
  description: "Blog by Akhil Thirunalveli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      id="top"
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        vt323.variable,
        sourceSerif4.variable,
        jetbrainsMono.variable,
        outfit.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
