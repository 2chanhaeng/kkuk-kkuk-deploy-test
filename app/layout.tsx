import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { auth } from "@/auth";
import NavBar from "./components/NavBar";
import "./globals.css";
import {
  getSignedNavBarItems,
  notSignedNavBarItems,
  staticNavBarItems,
} from "./lib";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = {
    // user: false, // 비로그인 상태
    user: { image: "/kkuk-kkuk.svg" }, // 로그인 상태
  }; // await auth();
  const rightNavBarItems = user
    ? getSignedNavBarItems(user)
    : notSignedNavBarItems;
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b mb-2">
          <NavBar leftItems={staticNavBarItems} rightItems={rightNavBarItems} />
        </header>
        {children}
      </body>
    </html>
  );
}
