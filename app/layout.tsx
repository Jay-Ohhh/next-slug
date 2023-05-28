// todo sitemap robot google analytics i18n
import "@/styles/globals.css";
import { inter, satoshi } from "@/styles/font";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./Providers";
import { constructMeta } from "@/lib/utils";
import clsx from "clsx";

export const metadata = constructMeta({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(satoshi.variable, inter.variable)}>
        <Providers>
          {children}
        </Providers>
        {/* https://www.npmjs.com/package/@vercel/analytics */}
        <Analytics />
      </body>
    </html>
  );
}
