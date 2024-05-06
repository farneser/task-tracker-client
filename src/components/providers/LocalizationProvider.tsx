import locales, {LocaleKey, Translations} from "@/hooks/locals/locales.ts";
import {createContext, FC, PropsWithChildren, useState} from "react";

interface LocaleContextType {
    locale: LocaleKey;
    translations: Translations;
    setLocale: (locale: LocaleKey) => void;
}

export const LocalizationContext = createContext<LocaleContextType | undefined>(undefined);

const LocalizationProvider: FC<PropsWithChildren> = ({children}) => {
    const [locale, setLocale] = useState<LocaleKey>('en');

    const contextValue: LocaleContextType = {
        locale,
        translations: locales[locale],
        setLocale,
    };

    return (
        <LocalizationContext.Provider value={contextValue}>
            {children}
        </LocalizationContext.Provider>
    );
};

export default LocalizationProvider;