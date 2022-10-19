import locale_en_us from "./en-us";
import locale_pl_pl from "./pl-pl";
import '../extensions/ArrayExtension'

export interface Locale {
    key: string;
    language: string;
    strings: {[key: string]: string};
    blockUpgrades: {[namespace: string]: UpgradeLocaleEntry};
    otherUpgrades: {[namespace: string]: UpgradeLocaleEntry};
    splashes: string[];
}

export interface UpgradeLocaleEntry {
    title: string;
    description: string;
}

export const DEFAULT_LANGUAGE = "en-us";
let currentLanguage = DEFAULT_LANGUAGE;

export const AVALIBLE_LOCALES: Locale[] = [
    locale_pl_pl,
    locale_en_us,
]

export function getLocalizedBlockUpgrade(namespace: string): UpgradeLocaleEntry {
    let localized = getCurrentLocale().blockUpgrades[namespace];
    if (!localized) {
        localized = getDefaultLocale().blockUpgrades[namespace];
    }
    return localized;
}

export function getLocalizedOtherUpgrade(namespace: string): UpgradeLocaleEntry {
    let localized = getCurrentLocale().otherUpgrades[namespace];
    if (!localized) {
        localized = getDefaultLocale().otherUpgrades[namespace];
    }
    return localized;
}

export function getRandomSplash(): string {
    return getCurrentLocale().splashes.pick();
}

export function getLocalizedString(key: string, defaultValue?: string): string {
    let localized = getCurrentLocale().strings[key];
    if (!localized) {
        localized = getDefaultLocale().strings[key];
    }
    return localized ?? defaultValue;
}

export function getCurrentLocale(): Locale {
    return getLocaleByKey(currentLanguage) ?? getLocaleByKey(DEFAULT_LANGUAGE)!;
}

export function getDefaultLocale(): Locale {
    return getLocaleByKey(DEFAULT_LANGUAGE)!;
}

export function getLocaleByKey(key: string): Locale | undefined {
    return AVALIBLE_LOCALES.find((val) => val.key === key);
}