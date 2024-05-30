import ru from "@/hooks/locals/ru.ts";
import en from "@/hooks/locals/en.ts";

type Field = {
    label: string;
    placeholder: string;
    required: string;
    invalid: string;
    minLength: string;
    maxLength: string;
}

export type Translations = {
    loginPage: {
        heading: string;
        submit: string;
        login: Field;
        password: Field;
        accountNotExists: string;
    },
    registerPage: {
        heading: string;
        submit: string;
        username: Field;
        email: Field;
        password: Field;
        confirmPassword: Field;
        accountAlreadyExists: string;
    },
    statusForm: {
        headingCreate: string;
        headingEdit: string;
        statusName: Field;
        statusColor: Field;
        isCompleted: {
            label: string;
            required: string;
        },
        submitCreate: string;
        submitEdit: string;
    },
    statusElement: {
        createTask: string;
        archive: string;
    },
    taskForm: {
        headingCreate: string;
        headingEdit: string;
        title: Field;
        description: Field;
        submitCreate: string;
        submitEdit: string;
    },
    projectPage: {
        createStatus: string;
    },
    credentials: {
        author: string;
        repo: string;
        icons: string;
    },
    sideBar: {
        dashboard: string;
        createNewProject: string;
    },
    members: {
        inviteLink: {
            create: string;
            delete: string;
            placeholder: string;
            copied: string;
        },
        member: {
            delete: string;
            leave: string;
            changeRole: string;
            you: string;
            role: {
                member: string;
                admin: string;
                creator: string;
            }
        }
    },
    header: {
        members: (id: number) => string;
        archive: {
            open: string;
            close: string;
        },
        tasks: {
            archive: string;
            refresh: string;
        },
        loginAs: (email: string) => string;
        logout: string;
    },
    confirmEmailPage: {
        successfullyConfirm: string;
        error: {
            title: string;
            message: string;
        };
        home: string;
    },
    acceptInvitePage: {
        title: string;
        invite: (email: string, projectName: string) => string;
        error: {
            title: string;
            message: string;
        };
        accept: string;
    },
    project: {
        leave: string;
        delete: string;
    },
    projectForm: {
        headingCreate: string;
        headingEdit: string;
        projectName: Field;
        submitCreate: string;
        submitEdit: string;
    },
    colorPicker: {
        color: {
            red: string;
            green: string;
            blue: string;
        },
        select: string;
        hex: string;
        error: string;
    },
    userSettings: {
        header: string;
        emailNotifications: string;
        save: string;
    },
    welcomePage: {
        title: string;
        message: string;
        login: string;
        register: string;
        dashboard: string;
    },
    projectsPage: {
        uncompletedTasks: (num: number) => string;
        assignedTasks: (num: number) => string;
        members: (num: number) => string;
        statistics: string;
    }
};

export const DEFAULT_LOCALE: LocaleKey = "en";

export type LocaleKey = "en" | "ru";

const locales: Record<LocaleKey, Translations> = {en, ru,};

export const localeKeys: LocaleKey[] = Object.keys(locales) as LocaleKey[];

export default locales;
