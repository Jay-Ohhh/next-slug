/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema, formatErrors } from "./schema.mjs";
import { env as clientEnv } from "./client.mjs";

const serverEnv = {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_SENDER: process.env.EMAIL_SERVER_SENDER,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    PROJECT_ID_VERCEL: process.env.PROJECT_ID_VERCEL,
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL,
    AUTH_BEARER_TOKEN: process.env.AUTH_BEARER_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    RSA_PRIVATE_KEY: process.env.RSA_PRIVATE_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    HOST: process.env.VERCEL_URL || process.env.HOST,
    ORIGIN: `https://${process.env.VERCEL_URL || process.env.HOST}`,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: !!process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
};

const _serverEnv = serverSchema.safeParse(serverEnv);

if (!_serverEnv.success) {
    console.error(
        "❌ Invalid environment variables:\n",
        ...formatErrors(_serverEnv.error.format()),
    );
    throw new Error("Invalid environment variables");
}

for (let key of Object.keys(_serverEnv.data)) {
    if (key.startsWith("NEXT_PUBLIC_")) {
        console.warn("❌ You are exposing a server-side env-variable:", key);

        throw new Error("You are exposing a server-side env-variable");
    }
}

export const env = { ..._serverEnv.data, ...clientEnv };