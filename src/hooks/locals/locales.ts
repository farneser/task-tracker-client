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
    },
    statusForm: {
        headingCreate: string,
        headingEdit: string,
        statusName: Field,
        statusColor: Field,
        isCompleted: {
            label: string,
            required: string
        },
        submitCreate: string,
        submitEdit: string,
    },
    statusElement: {
        createTask: string
    },
    taskForm: {
        headingCreate: string,
        headingEdit: string,
        title: Field,
        description: Field,
        submitCreate: string,
        submitEdit: string,
    },
    projectPage: {
        createStatus: string
    },
    credentials: {
        author: string,
        repo: string,
        icons: string,
    },
    sideBar: {
        dashboard: string,
        createNewProject: string
    },
    members: {
        inviteLink: {
            create: string;
            delete: string;
            placeholder: string;
        },
        member: {
            delete: string;
            changeRole: string;
        }
    }
};

export type LocaleKey = "en" | "ru";

const locales: Record<LocaleKey, Translations> = {en, ru,};

export const localeKeys: LocaleKey[] = Object.keys(locales) as LocaleKey[];

export default locales;
