const getBaseUrl = () => {
    let baseUrl = import.meta.env.VITE_API_URL

    if (!baseUrl) {
        baseUrl = "http://localhost:8080"
    }

    if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.slice(0, -1);
    }

    return baseUrl;
}

type ConstantsType = {
    baseUrl: string;
    authTokenKey: string;
    statuses: {
        SUCCESS: number;
        UNAUTHORIZED: number;
        ACCESS_TOKEN_EXPIRED: number;
        REFRESH_TOKEN_EXPIRED: number;
        SERVER_ERROR: number;
    };
}

const constants: Readonly<ConstantsType> = {
    baseUrl: getBaseUrl(),
    authTokenKey: "auth_token",
    statuses: {
        SUCCESS: 200,
        UNAUTHORIZED: 401,
        ACCESS_TOKEN_EXPIRED: 4011,
        REFRESH_TOKEN_EXPIRED: 4012,
        SERVER_ERROR: 500,
    }
}

export default constants;