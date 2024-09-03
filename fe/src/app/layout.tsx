import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/store/StoreProvider";
import ReactQueryProvider from "@api/ReactQueryProvider";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nera Challenge",
  description: "Nera Challenge next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <StoreProvider>
            <header className={styles.header}>
              <h1 className={styles.header_title}>NIRA CHALLENGE</h1>
            </header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
              <h4 className={styles.footer_title}>Hecho por Fernando de Row</h4>
            </footer>
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
