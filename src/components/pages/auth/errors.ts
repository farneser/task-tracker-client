type ErrorCodeMap = {
    [errorCode: number]: string;
};

export const errorMessages: ErrorCodeMap = {
    400: "Invalid email or password",
    409: "This email is already registered",
    403: "User is not activated. Please check your email for activation link",
    500: "Server error. Please try again later",
}
