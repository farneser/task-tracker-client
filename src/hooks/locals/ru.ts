import {Translations} from "@/hooks/locals/locales.ts";

const ru: Translations = {
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
    },
    registerPage: {
        heading: "Страница регистрации",
        username: {
            label: "Имя пользователя",
            placeholder: "Введите ваше имя пользователя",
            required: "Это поле обязательно для заполнения",
            invalid: "Неверный формат",
            minLength: "Минимальная длина: 4 символ",
            maxLength: "Максимальная длина: 64 символов"
        },
        email: {
            label: "Email",
            placeholder: "Введите ваш Email",
            required: "Это поле обязательно для заполнения",
            invalid: "Неверный формат",
            minLength: "Email слишком короткий",
            maxLength: "Email слишком длинный"
        },
        password: {
            label: "Пароль",
            placeholder: "Введите ваш пароль",
            required: "Это поле обязательно для заполнения",
            invalid: "Неверный пароль",
            minLength: "Минимальная длина: 8 символов",
            maxLength: "Максимальная длина: 64 символов"
        },
        confirmPassword: {
            label: "Подтвердите пароль",
            placeholder: "Подтвердите ваш пароль",
            required: "Это поле обязательно для заполнения",
            invalid: "Пароли не совпадают",
            minLength: "Минимальная длина: 8 символов",
            maxLength: "Максимальная длина: 64 символов"
        },
        submit: "Зарегистрироваться",
        accountAlreadyExists: "Аккаунт уже существует?"
    }
}

export default ru;