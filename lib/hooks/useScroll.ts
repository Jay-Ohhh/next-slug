import { useState, useEffect, useRef, useMemo } from "react";
import throttle from "lodash/throttle";
import useUnmountedRef from "./useUnmountedRef";

export default function useScroll(threshold: number, throttleWait = 100) {
    const scrolledRef = useRef<boolean>();
    const unmountedRef = useUnmountedRef();
    const [scrolled, setScrolled] = useState(false);
    scrolledRef.current = scrolled;

    const onScroll = useMemo(() => {
        return throttle(() => {
            const flag = window.scrollY > threshold;

            if (!unmountedRef.current && flag !== scrolledRef.current) {
                setScrolled(flag);
            }
        }, throttleWait, {
            leading: true,
        });
        /* eslint-disable */
    }, [threshold, throttleWait]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [onScroll]);

    return scrolledRef.current;
}