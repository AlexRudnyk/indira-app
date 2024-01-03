import type { Metadata } from "next";
import "./globals.css";
import { Footer, NavBar, ReduxWrapper } from "../../app/[locale]/components";
import Providers from "@/redux/Provider";
import PersistGates from "@/redux/PersistGate";
import { GlobalContextProvider } from "./context/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata: Metadata = {
  title: "Indira",
  description: "Internet shop of soap",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body>
        <Providers>
          <PersistGates>
            <ReduxWrapper>
              <GlobalContextProvider>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <NavBar />
                  {children}
                  <Footer />
                </NextIntlClientProvider>
              </GlobalContextProvider>
            </ReduxWrapper>
          </PersistGates>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
