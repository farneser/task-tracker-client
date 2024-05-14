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
            minLength: "Минимальная длина: 4 символа",
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
    },
    statusForm: {
        headingCreate: "Создать новый статус",
        headingEdit: "Обновить статус",
        statusName: {
            label: "Название статуса",
            placeholder: "Введите название статуса",
            required: "Название статуса обязательно",
            invalid: "Недопустимое название статуса",
            minLength: "Минимальная длина: 1 символ",
            maxLength: "Максимальная длина: 255 символов"
        },
        statusColor: {
            label: "Цвет статуса",
            placeholder: "Введите цвет статуса",
            required: "Цвет статуса обязателен",
            invalid: "Недопустимый цвет",
            minLength: "Минимальная длина: 4 символа",
            maxLength: "Максимальная длина: 7 символов"
        },
        isCompleted: {
            label: "Отметить задачи в этом списке как выполненные",
            required: "Это поле обязательно"
        },
        submitCreate: "Добавить статус",
        submitEdit: "Обновить статус"
    },
    statusElement: {
        createTask: "Создать новую задачу"
    },
    taskForm: {
        headingCreate: "Создать новую задачу",
        headingEdit: "Обновить задачу",
        title: {
            label: "Заголовок задачи",
            placeholder: "Введите заголовок задачи",
            required: "Заголовок задачи обязателен",
            invalid: "Недопустимое название заголовка",
            minLength: "Минимальная длина: 1 символ",
            maxLength: "Максимальная длина: 255 символов"
        },
        description: {
            label: "Описание задачи",
            placeholder: "Введите описание задачи",
            required: "Описание задачи обязательно",
            invalid: "Недопустимое описание задачи",
            minLength: "Минимальная длина: 1 символ",
            maxLength: "Максимальная длина: 255 символов"
        },
        submitCreate: "Добавить задачу",
        submitEdit: "Обновить задачу"
    },
    projectPage: {
        createStatus: "Создать новый статус"
    },
    credentials: {
        author: "© 2024 Сделано",
        repo: "Изучить код на GitHub",
        icons: "Иконки взяты с сайта"
    },
    sideBar: {
        dashboard: "Главная",
        createNewProject: "Создать новый проект"
    },
    members: {
        inviteLink: {
            create: "Создать приглашение",
            delete: "Удалить приглашение",
            placeholder: "Ссылка приглашения",
            copied: "Ссылка успешно скопирована",
        },
        member: {
            delete: "Удалить пользователя",
            changeRole: "Сохранить роль",
            leave: "Покинуть проект",
            you: "Вы",
            role: {
                member: "Участник",
                admin: "Адмнистратор",
                creator: "Владелец",
            }
        }
    },
    header: {
        members: (id) => `Участников проекта: ${id}`,
        archive: {
            open: "Открыть архив",
            close: "Закрыть архив",
        },
        tasks: {
            archive: "Архивировать задачи",
            refresh: "Обновить задачи",
        },
        loginAs: (e) => `${e}`,
        logout: "Выход",
    },
    confirmEmailPage: {
        successfullyConfirm: "Подтверждение электронной почты успешно!",
        error: {
            title: "Ошибка подтверждения электронной почты",
            message: "Возможно, ссылка устарела или токен недействителен."
        },
        home: "Вернуться на главную"
    },
    acceptInvitePage: {
        title: "Присоединиться к проекту",
        invite: (e, p) => `${e} приглашает вас в ${p}`,
        error: {
            title: "Не удалось принять приглашение",
            message: "Токен приглашения в проект недействителен или истек срок его действия."
        },
        accept: "Принять приглашение"
    },
    project: {
        delete: "Удалить проект",
        leave: "Выйти из проекта",
    }
}

export default ru;