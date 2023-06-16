// todo sitemap robot google analytics i18n
import "@/styles/globals.css";
import { inter, satoshi } from "@/styles/font";
import { Analytics } from "@vercel/analytics/react";
import Providers from "../../components/Providers";
import { constructMeta } from "@/lib/server";
import clsx from "clsx";
import { i18n } from "@/i18n.config";

export const metadata = constructMeta({});

export async function generateStaticParams() {
  return i18n.locales.map(lang => ({ lang }));
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: PageParams;
}) {
  return (
    <html lang={params.lang}>
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
