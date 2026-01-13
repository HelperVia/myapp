"use server";
import { Inter, Roboto } from "next/font/google";
import StoreProvider from "./store-provider";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "@lib/theme/default";
import SocketLayout from "./socket-layout";
import { NotificationProvider } from "@components/ui/notification/NotificationProvider";
import Bootstrap from "./bootstrap";
import Index from "./index";
const inter = Inter({
  display: "swap",
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  display: "swap",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider theme={defaultTheme}>
          <StoreProvider>
            <SocketLayout>
              <Bootstrap>
                <NotificationProvider>
                  <Index>{children}</Index>
                </NotificationProvider>
              </Bootstrap>
            </SocketLayout>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
