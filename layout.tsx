import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../context/Providers";
import { Toaster } from "sonner";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Prashikshan | The Internship Platform",
  description: "A structured platform for students, colleges, and industry - from discovery to verified certification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="font-sans bg-[#F7F6F3] text-[#111111] min-h-screen flex flex-col selection:bg-[#1A1A1A] selection:text-white">
        <Providers>
          {children}
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#F0FDF4',
                color: '#111111',
                border: '1px solid #16A34A',
                fontFamily: 'var(--font-inter)',
                borderRadius: '8px'
              },
              classNames: {
                error: 'bg-red-50 border-red-500 text-red-900',
                success: 'bg-green-50 border-green-500 text-green-900',
                warning: 'bg-amber-50 border-amber-500 text-amber-900',
                info: 'bg-blue-50 border-blue-500 text-blue-900',
              }
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
