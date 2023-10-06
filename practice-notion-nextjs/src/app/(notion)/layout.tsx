import "~/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "backward99의 notion",
  description: "next js, ts, tailwind notion 클론하기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
