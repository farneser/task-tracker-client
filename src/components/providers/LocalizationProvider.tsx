import locales, {LocaleKey, Translations} from "@/hooks/locals/locales.ts";
import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {getLocalStorageItem, setLocalStorage} from "@/utils/localStorage.utils.ts";

interface LocaleContextType {
    locale: LocaleKey;
    translations: Translations;
    setLocale: (locale: LocaleKey) => void;
}

export const LocalizationContext = createContext<LocaleContextType | undefined>(undefined);

export const LocalizationProvider: FC<PropsWithChildren> = ({children}) => {
    const [locale, setLocaleState] = useState<LocaleKey>(() => {
        return getLocalStorageItem<LocaleKey>('locale') || "en";
    });

    const setLocale = (newLocale: LocaleKey) => {
        setLocaleState(newLocale);

        setLocalStorage('locale', newLocale)
    };

    const contextValue: LocaleContextType = {
        locale,
        translations: locales[locale],
        setLocale,
    };

    useEffect(() => {
        const storedLocale = getLocalStorageItem<LocaleKey>('locale');

        setLocaleState(storedLocale ?? "en");
    }, [locale]);

    return (
        <LocalizationContext.Provider value={contextValue}>
            {children}
        </LocalizationContext.Provider>
    );
};