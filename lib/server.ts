import { FAVICON_FOLDER } from "@/lib/constants";
import { env } from "@/env/server.mjs";
import { type Metadata } from "next";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest } from "next/server";
import { i18n } from "@/i18n.config.mjs";

// https://realfavicongenerator.net/ 
// https://pjchender.dev/html/html-seo-meta/
// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
// https://stackoverflow.com/questions/46688663/what-is-the-difference-between-favicon-and-image
// // Target ios browsers.
// <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
// // Target safari on MacOS.
// <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
// // The classic favicon displayed in tabs.
// <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
// // Used by Android Chrome for the "Add to home screen" icon and settings.
// <link rel="manifest" href="/site.webmanifest">
// // Used for Safari pinned tabs.
// <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#193860">
// // Target older browsers like IE 10 and lower.
// <link rel="icon" href="/favicon.ico">
// // Used by Chrome, Firefox OS, and opera to change the browser address bar.
// <meta name="theme-color" content="#ccccc7">
// // Used by windows 8, 8.1, and 10 for the start menu tiles.
// <meta name="msapplication-TileColor" content="#00aba9"></meta>
export function constructMeta({
    title = "Next-Slug - Link Management for Modern Marketing Teams",
    description = "Next-Slug is an open-source link management tool for modern marketing teams to create, share, and track short links. Forked from Dub.",
    applicationName = "Next-Slug",
    url = new URL(env.ORIGIN),
}): Metadata {
    const metadata: Metadata = {
        title: title,
        description: description,
        applicationName: applicationName,
        keywords: ["link management tool", "url-slug", "customizable domains", "open-source"],
        authors: [
            { name: "Jay_Ohhh", url: "https://github.com/Jay-Ohhh" },
            { name: "steven-tey", url: "https://github.com/steven-tey" },
        ],
        colorScheme: "light",
        creator: "Jay_Ohhh",
        publisher: "Jay_Ohhh",
        metadataBase: url,
        themeColor: "#ffffff",
        category: "link management tool",
        viewport: {
            width: "device-width",
            initialScale: 1,
            maximumScale: 1,
            viewportFit: "cover",
        },
        openGraph: {
            title: title,
            description: description,
            url: url.origin,
            siteName: applicationName,
            images: [
                {
                    url: "/_static/thumbnail.png",
                    width: 800,
                    height: 600,
                    alt: description,
                },
                {
                    url: "/_static/thumbnail.png",
                    width: 1800,
                    height: 1600,
                    alt: description,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            siteId: "1662405059479740416",
            creator: "Jay_Ohhh",
            creatorId: "1662405059479740416",
            images: ["/_static/thumbnail.png"],
        },
        // 定义要在搜索结果中显示的网站图标: https://developers.google.com/search/docs/appearance/favicon-in-search?hl=zh-cn#guidelines
        icons: {
            icon: "/favicon.ico",
            other: [
                {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    url: `${FAVICON_FOLDER}/apple-touch-icon.png`,
                    fetchPriority: "low",
                },
                //  一些旧版的浏览器或搜索引擎可能不支持 SVG 格式的图标。此外，一些搜索引擎可能会从网站中提取 ICO 或 PNG 格式的图标，而不是使用指定的 SVG 文件。
                // 因此，建议在网站中同时提供 ICO、PNG 和 SVG 三种格式的图标
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    url: `${FAVICON_FOLDER}/favicon-16x16.png`,
                    fetchPriority: "low",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    url: `${FAVICON_FOLDER}/favicon-32x32.png`,
                    fetchPriority: "low",
                },
                {
                    rel: "mask-icon",
                    url: `${FAVICON_FOLDER}/safari-pinned-tab.svg`,
                    fetchPriority: "low",
                },
            ]
        },
        other: {
            "msapplication-TileColor": "#ffffff",
        }
    };

    return metadata;
}

export function getServerLocale(req: {
    cookies: Pick<NextRequest["cookies"], "get">;
    headers: Pick<NextRequest["headers"], "get">;
}) {
    const _lang = req.cookies.get("_lang")?.name;

    if (_lang && i18n.locales.includes(_lang as any)) {
        return _lang;
    }

    const languages = new Negotiator({
        headers: {
            // keys must be lowercase
            "accept-language": req.headers.get("accept-language") || undefined,
        }
    }).languages();

    return match(languages, i18n.locales as unknown as string[], i18n.defaultLocale);
}