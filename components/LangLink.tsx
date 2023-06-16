"use client";

import { useLocale } from "@/lib/hooks/useLocale";
import { generateUrl } from "@/lib/common";
import Link from "next/link";

export type LangLinkProps = Parameters<typeof Link>[0];

export default function LangLink(props: LangLinkProps) {
    const locale = useLocale();
    let href = typeof props.href === "string" ? generateUrl(props.href, locale) : props.href;

    return (
        <Link
            rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
            {...props}
            href={href}
        />
    );
}