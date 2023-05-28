/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./env/server.mjs"));

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // gzip by nginx
    compress: process.env.GZIP === "false" ? false : true,
    images: {
        domains: [
            "www.google.com",
            "avatar.vercel.sh",
            "faisalman.github.io",
            "avatars.dicebear.com",
            "res.cloudinary.com",
            "pbs.twimg.com",
            "d2vwwcvoksz7ty.cloudfront.net",
            "media.cleanshot.cloud",
        ],
    },
    async headers() {
        return [
            {
                source: "/login",
                headers: [
                    {
                        // X-Frame-Options HTTP 响应头是用来给浏览器指示允许一个页面可否在 <frame>、<iframe>、<embed> 或者 <object> 中展现的标记。
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                ],
            },
            {
                source: "/register",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                ],
            },
            {
                source: "/:path*",
                headers: [
                    {
                        // Referrer-Policy 首部用来监管哪些访问来源信息——会在 Referer 中发送
                        key: "Referrer-Policy",
                        // 在同等安全级别的情况下，引用页面的地址会被发送 (HTTPS->HTTPS)，但是在降级的情况下不会被发送 (HTTPS->HTTP)
                        value: "no-referrer-when-downgrade",
                    },
                    {
                        // X-DNS-Prefetch-Control 头控制着浏览器的 DNS 预读取功能。DNS 预读取是一项使浏览器主动去执行域名解析的功能，其范围包括文档的所有链接，无论是图片的，CSS 的，还是 JavaScript 等其他用户能够点击的 URL
                        key: "X-DNS-Prefetch-Control",
                        // 启用 DNS 预解析。在浏览器支持 DNS 预解析的特性时即使不使用该标签浏览器依然会进行预解析
                        value: "on",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
