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
            minLength: "Minimum length: 1 charterer",
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
    },
    registerPage: {
        heading: "Register page",
        username: {
            label: "Username",
            placeholder: "Enter your username",
            required: "This field is required",
            invalid: "Invalid input: only Latin letters, digits, and underscores are allowed.",
            minLength: "Minimum length: 4 characters",
            maxLength: "Maximum length: 64 characters"
        },
        email: {
            label: "Email",
            placeholder: "Enter your Email",
            required: "This field is required",
            invalid: "Invalid format",
            minLength: "Email is too short",
            maxLength: "Email is too long"
        },
        password: {
            label: "Password",
            placeholder: "Enter your password",
            required: "This field is required",
            invalid: "Invalid password",
            minLength: "Minimum length: 8 characters",
            maxLength: "Maximum length: 64 characters"
        },
        confirmPassword: {
            label: "Confirm Password",
            placeholder: "Confirm your password",
            required: "This field is required",
            invalid: "Passwords do not match",
            minLength: "Minimum length: 8 characters",
            maxLength: "Maximum length: 64 characters"
        },
        submit: "Register",
        accountAlreadyExists: "Account already exists?"
    },
    statusForm: {
        headingCreate: "Create a new status",
        headingEdit: "Update status",
        statusName: {
            label: "Status name",
            placeholder: "Enter status name",
            required: "Status name is required",
            invalid: "Invalid status name",
            minLength: "Minimum length: 1 character",
            maxLength: "Maximum length: 255 characters"
        },
        statusColor: {
            label: "Status color",
            placeholder: "Enter status color",
            required: "Status color is required",
            invalid: "Invalid color",
            minLength: "Minimum length: 4 characters",
            maxLength: "Maximum length: 7 characters"
        },
        isCompleted: {
            label: "Mark tasks in this list as completed",
            required: "This field is required"
        },
        submitCreate: "Add status",
        submitEdit: "Update status"
    },
    statusElement: {
        createTask: "Create New Task",
        archive: "Archive",
    },
    taskForm: {
        headingCreate: "Create a new task",
        headingEdit: "Update task",
        title: {
            label: "Task title",
            placeholder: "Enter task title",
            required: "Task title is required",
            invalid: "Invalid title name",
            minLength: "Minimum length: 1 character",
            maxLength: "Maximum length: 255 characters"
        },
        description: {
            label: "Task description",
            placeholder: "Enter task description",
            required: "Task description is required",
            invalid: "Invalid task description",
            minLength: "Minimum length: 1 character",
            maxLength: "Maximum length: 255 characters"
        },
        assignedFor: {
            label: "Assign task for user",
            notAssigned: "Do not assign",
        },
        submitCreate: "Add task",
        submitEdit: "Update task"
    },
    projectPage: {
        createStatus: "Create a new Status"
    },
    credentials: {
        author: "© 2024 Made by",
        repo: "Explore code on GitHub",
        icons: "Icons sourced from"
    },
    sideBar: {
        dashboard: "Dashboard",
        createNewProject: "Create a new Project"
    },
    members: {
        inviteLink: {
            create: "Create invitation",
            delete: "Delete invitation",
            placeholder: "Invitation link",
            copied: "Link successfully copied",
        },
        member: {
            delete: "Delete user",
            leave: "Leave project",
            changeRole: "Save role",
            you: "You",
            role: {
                member: "Member",
                admin: "Admin",
                creator: "Owner",
            }
        }
    },
    header: {
        members: (id) => `Project members count: ${id}`,
        archive: {
            open: "Open archive",
            close: "Close archive",
        },
        tasks: {
            archive: "Archive tasks",
            refresh: "Refresh tasks",
        },
        loginAs: (e) => `${e}`,
        logout: "Logout",
    },
    confirmEmailPage: {
        successfullyConfirm: "Email confirmation successful!",
        error: {
            title: "Email confirmation error",
            message: "Perhaps the link has expired or the token is invalid."
        },
        home: "Return to Home"
    },
    acceptInvitePage: {
        title: "Connect to the project",
        invite: (e, p) => `${e} invites you to the ${p}`,
        error: {
            title: "Failed to accept invite",
            message: "Project invite token is invalid or expired."
        },
        accept: "Accept invite"
    },
    project: {
        delete: "Delete project",
        leave: "Leave project",
    },
    projectForm: {
        headingCreate: "Create a new project",
        headingEdit: "Update project",
        projectName: {
            label: "Project name",
            placeholder: "Enter project name",
            required: "Project name is required",
            invalid: "Invalid project name",
            minLength: "Minimum length: 1 character",
            maxLength: "Maximum length: 255 characters"
        },
        submitCreate: "Create project",
        submitEdit: "Update project"
    },
    colorPicker: {
        color: {
            red: "Red",
            green: "Green",
            blue: "Blue",
        },
        select: "Select color",
        hex: "Hex color",
        error: "Length only 3 or 6 characters",
    },
    userSettings: {
        header: "User settings",
        emailNotifications: "Subscribe for email notifications",
        save: "Save settings",
    },
    welcomePage: {
        title: "Welcome!",
        message: "Welcome to the main page of our website - your unique project management tool. Here you can easily create and organize projects, effectively monitor task completion, interact with friends and colleagues, and optimize your time to the fullest while managing project processes.",
        login: "Log In",
        register: "Free Registration",
        dashboard: "Go to Dashboard"
    },
    projectsPage: {
        uncompletedTasks: (num) => `Count of uncompleted tasks in your projects: ${num}`,
        assignedTasks: (num) => `Count of assigned for you tasks: ${num}`,
        members: (num) => `Count of members in your projects: ${num}`,
        statistics: "Statistics of your projects"
    }
}

export default en;