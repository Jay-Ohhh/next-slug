import { type PropsWithChildren } from "react";
import clsx from "clsx";

export default function MaxWidthWrapper({
    className,
    children
}: PropsWithChildren<{ className?: string; }>) {
    return (
        <div className={clsx("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
            {children}
        </div>
    );
}