import { log } from "console";

const WEB_LOCALES: string[] = ['en', 'ko']

export default function createLocaleRoute(paths: string[]): string[] {
    const ls = [];
    paths.map(path => ls.push(...WEB_LOCALES.map(locale => `${locale}/${path}`)));
    log(ls)
    return ls;
}