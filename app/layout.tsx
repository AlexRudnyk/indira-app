import type { Metadata } from "next";
import "./globals.css";
import { NavBar, ReduxWrapper } from "@/components";
import Providers from "@/redux/Provider";
import PersistGates from "@/redux/PersistGate";
import { GlobalContextProvider } from "./context/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <PersistGates>
            <ReduxWrapper>
              <GlobalContextProvider>
                <NavBar />
                {children}
              </GlobalContextProvider>
            </ReduxWrapper>
          </PersistGates>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
