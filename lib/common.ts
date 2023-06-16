import trim from "lodash/trim";
import trimStart from "lodash/trimStart";

export function isBrowser() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

export function isUrl(url: string) {
    if (!url || typeof url !== "string")
        return false;

    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * @param url 
 * @param prefix valid for relative url
 * @returns 
 */
export function generateUrl(url: string, prefix?: string) {
    const _prefix = prefix ? `/${trim(prefix, "/")}` : "";

    if (url === "/") {
        return _prefix || url;
    }

    return isUrl(url) ? url : _prefix + `/${trimStart(url, "/")}`;
}
