"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

type Props = {
    children?: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <Toaster />
            {children}
        </SessionProvider>
    );
};

export default Providers;