import locales, {DEFAULT_LOCALE, LocaleKey, localeKeys, Translations} from "@/hooks/locals/locales.ts";
import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {getLocalStorageItem, setLocalStorage} from "@/utils/localStorage.utils.ts";

interface LocaleContextType {
    locale: LocaleKey;
    translations: Translations;
    setLocale: (locale: LocaleKey) => void;
    locales: LocaleKey[];
}

export const LocalizationContext = createContext<LocaleContextType | undefined>(undefined);

const getDefaultLocal = (): LocaleKey => {
    const userLang = navigator.language;

    for (const key in locales) {
        if (userLang.includes(key)) {
            return key as LocaleKey;
        }
    }

    return DEFAULT_LOCALE;
}

export const LocalizationProvider: FC<PropsWithChildren> = ({children}) => {
    const defaultLocale = getDefaultLocal();

    const [locale, setLocaleState] = useState<LocaleKey>(() => {
        return getLocalStorageItem<LocaleKey>('locale') || defaultLocale;
    });

    const setLocale = (newLocale: LocaleKey) => {

        setLocalStorage('locale', newLocale)

        setLocaleState(newLocale);
    };

    useEffect(() => {
        const storedLocale = getLocalStorageItem<LocaleKey>('locale');

        setLocaleState(storedLocale ?? defaultLocale);
    }, [defaultLocale, locale]);

    return (
        <LocalizationContext.Provider value={{
            locale,
            translations: locales[locale],
            setLocale,
            locales: localeKeys
        }}>
            {children}
        </LocalizationContext.Provider>
    );
};