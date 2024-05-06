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
    }
};

export type LocaleKey = "en" | "ru";

const locales: Record<LocaleKey, Translations> = {
    en: {
        loginPage: {
            heading: "Log in to your account",
            submit: "Log In",
            login: {
                label: "Login or Email",
                placeholder: "Enter your login or Email",
                required: "This field is required",
                invalid: "Invalid format",
                minLength: "Minimum length: 1 charterers",
                maxLength: "Maximum length: 255 charterers"
            },
            password: {
                label: "Password",
                placeholder: "Enter your password",
                required: "This field is required",
                invalid: "Invalid password",
                minLength: "Minimum length: 8 charterers",
                maxLength: "Maximum length: 64 charterers"
            },
            accountNotExists: "Don't have an account?"
        }
    },
    ru: {
        loginPage: {
            heading: "Вход на сайт",
            submit: "Войти",
            login: {
                label: "Логин или Email",
                placeholder: "Введите ваш логин или Email",
                required: "Это поле обязательно для заполнения",
                invalid: "Неверный формат",
                minLength: "Минимальная длина: 1 символ",
                maxLength: "Максимальная длина: 255 символов"
            },
            password: {
                label: "Пароль",
                placeholder: "Введите ваш пароль",
                required: "Это поле обязательно для заполнения",
                invalid: "Неверный пароль",
                minLength: "Минимальная длина: 8 символов",
                maxLength: "Максимальная длина: 255 символов"
            },
            accountNotExists: "Отсутсвует аккаунт?"
        }
    },
};

export default locales;
