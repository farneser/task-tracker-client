const getBaseUrl = () => {
    let baseUrl = process.env.API_URL

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
}

const constants: Readonly<ConstantsType> = {
    baseUrl: getBaseUrl(),
    authTokenKey: "auth_token"
}

export default constants;