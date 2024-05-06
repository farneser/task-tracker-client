import {Translations} from "@/hooks/locals/locales.ts";

const en: Translations = {
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
}
export default en;