import ru from "@/hooks/locals/ru.ts";
import en from "@/hooks/locals/en.ts";

type Field = {
    label: string,
    placeholder: string,
    required: string,
    invalid: string,
    minLength: string,
    maxLength: string
}

export type Translations = {
    loginPage: {
        heading: string,
        submit: string,
        login: Field,
        password: Field,
        accountNotExists: string
    },
    registerPage: {
        heading: string,
        submit: string,
        username: Field,
        email: Field,
        password: Field,
        confirmPassword: Field,
        accountAlreadyExists: string
    }
};

export type LocaleKey = "en" | "ru";

const locales: Record<LocaleKey, Translations> = {en, ru,};

export default locales;
