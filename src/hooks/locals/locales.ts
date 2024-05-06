export type Translations = {
    loginPage: {
        heading: string,
        submit: string,
    }
    registerPageAccountNotExists: string;
    loginPageAccountAlreadyExists: string;
};

export type LocaleKey = "en" | "ru";

const locales: Record<LocaleKey, Translations> = {
    en: {
        loginPage: {
            heading: "Login page",
            submit: "Log In"
        },
        registerPageAccountNotExists: "",
        loginPageAccountAlreadyExists: "",
    },
    ru: {

        loginPage: {
            heading: "Страница входа",
            submit: "Войти",
        },
        registerPageAccountNotExists: "",
        loginPageAccountAlreadyExists: "",
    },
};

export default locales;
