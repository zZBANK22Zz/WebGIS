import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PSU Phuket Virtual Campus Tour | แผนที่ออนไลน์มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต",
  description: "Virtual Campus Tour และแผนที่ออนไลน์สำหรับสำรวจสถานที่ต่างๆ ในมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
