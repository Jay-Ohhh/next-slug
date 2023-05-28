import { type NextRequest } from "next/server";
export const parse = (req: NextRequest) => {
    let domain = req.headers.get("host") as string;
    const path = req.nextUrl.pathname;
    // decodeURIComponent to handle foreign languages like Hebrew
    const key = decodeURIComponent(path.split("/")[1]);
    const fullKey = decodeURIComponent(path).slice(1);

    return { domain, path, key, fullKey };
};