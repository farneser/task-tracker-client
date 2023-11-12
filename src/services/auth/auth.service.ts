import constants from "@/src/constants";
import {Token} from "@/src/models/token";
import axios from "axios";
import {getContentType} from "@/src/api/api.helper";
import {ErrorMessage} from "@/src/models/errorMessage";
import {setLocalStorage} from "@/src/utils/localStorage.utils";

const sendTokenRequest = async (data: Token | LoginType, path: string): Promise<Token | null> => {
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
    async refreshToken(token: Token): Promise<Token | null> {
        return sendTokenRequest(token, "/api/v1/auth/refresh")
    }
}

export default authService;