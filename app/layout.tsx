import type { Metadata } from "next";
import "./globals.css";

import { NavBar } from "@/components";
import Providers from "@/redux/Provider";

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
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
