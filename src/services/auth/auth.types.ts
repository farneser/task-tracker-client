type LoginType = {
    email: string;
    password: string;
}

type RegisterType = LoginType & {
    confirmPassword: string;
}