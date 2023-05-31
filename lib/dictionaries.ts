import "server-only";

const dictionaries = {
    zh: () => import("../dictionaries/zh.json").then(m => m.default),
    en: () => import("../dictionaries/en.json").then(m => m.default),
};

export type Dictionaries = typeof dictionaries;
export const getDictionary = async (locale: keyof Dictionaries) => dictionaries[locale]();