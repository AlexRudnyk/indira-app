import type { Metadata } from "next";
import "./globals.css";

import { NavBar } from "@/components";

export const metadata: Metadata = {
  title: "Indira",
  description: "Internet shop of soap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
