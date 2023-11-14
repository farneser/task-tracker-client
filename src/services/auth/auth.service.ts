
import axios from "axios";
import {ErrorMessage} from "@/models/errorMessage.ts";
import {Token} from "@/models/token.ts";
import {getContentType} from "@/api/api.helper.ts";
import {setLocalStorage} from "@/utils/localStorage.utils.ts";
import constants from "@/constants";


const sendTokenRequest = async (data: Token | LoginType | RegisterType, path: string): Promise<Token | null> => {
    const response = await axios.post<Token | ErrorMessage>(`${constants.baseUrl}${path}`, data, {
        headers: getContentType()
    });

    if ((response.data as Token).access_token) {
        const data = response.data as Token;

        setLocalStorage(constants.authTokenKey, data)
        return data;
    }

    return null;
}

export const authService = {
    async login(data: LoginType): Promise<Token | null> {
        return sendTokenRequest(data, "/api/v1/auth")
    },
    async register(data: RegisterType): Promise<Token | null> {
        return sendTokenRequest(data, "/api/v1/auth/register")
    },
    async refreshToken(token: Token): Promise<Token | null> {
        return sendTokenRequest(token, "/api/v1/auth/refresh")
    }
}

export default authService;