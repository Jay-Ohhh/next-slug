import { clientSchema, formatErrors } from "./schema.mjs";

export const clientEnv = {
    NEXT_PUBLIC_RSA_PUBLIC_KEY: process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY,
    NEXT_PUBLIC_VERCEL: !!process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_HOST,
};

const _clientEnv = clientSchema.safeParse(clientEnv);

if (!_clientEnv.success) {
    console.error(
        "❌ Invalid environment variables:\n",
        ...formatErrors(_clientEnv.error.format()),
    );

    throw new Error("Invalid environment variables");
}

for (let key of Object.keys(_clientEnv.data)) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
        console.warn(
            `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
        );

        throw new Error("Invalid public environment variable name");
    }
}

export const env = _clientEnv.data;