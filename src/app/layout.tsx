import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Providers } from "./providers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Yugaa Dashboard',
  description: 'Yugaa Dashboard.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
          <Providers>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {children}
            </div>
          </Providers>
      </body>
    </html>
  );
}
