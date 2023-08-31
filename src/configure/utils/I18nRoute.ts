
const WEB_LOCALES: string[] = ['en', 'ko']

export default function createLocaleRoute(path: string): string[] {
    return WEB_LOCALES.map(locale => `${locale}/${path}`)
}