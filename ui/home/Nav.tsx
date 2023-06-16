"use client";

import Image from "next/image";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/hooks/useScroll";
import clsx from "clsx";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import LangLink from "@/components/LangLink";
import Link from "next/link";
import type { Dict } from "@/lib/dictionaries";

const navItems = ["Changelog"];
const transparentHeaderSegments = new Set(["meta-tags"]);

export default function Nav({
    locale,
    dict,
}: {
    locale: Locale;
    dict: Dict;
}) {
    const scrolled = useScroll(80);
    const segment = useSelectedLayoutSegment();
    // const { domain } = useParams() as { domain: string; };
    // console.log("segment", segment);

    return (
        <div
            className={clsx(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
                "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
                "border-b border-gray-200 bg-white":
                    segment && !transparentHeaderSegments.has(segment),
            })}
        >
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between">
                    <Link
                        href="/"
                    >
                        <Image
                            src="/_static/logotype.svg"
                            alt="logo"
                            className="w-24"
                            width={834}
                            height={236}
                            priority
                        />
                    </Link>
                    <div className="hidden items-center space-x-6 sm:flex">
                        {navItems.map((item) => (
                            <LangLink
                                key={item}
                                href={`/${item}`}
                                className={`rounded-md text-sm font-medium capitalize ${segment === item ? "text-black" : "text-gray-500"
                                    } transition-colors ease-out hover:text-black`}
                            >
                                {/* @ts-ignore */}
                                {dict.nav[item]}
                            </LangLink>
                        ))}
                        <LangLink
                            href="/login"
                            className="rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                        >
                            {dict.nav["Login in"]}
                        </LangLink>
                        <LangLink
                            href="/register"
                            className="rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                        >
                            {dict.nav["Sign up"]}
                        </LangLink>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}