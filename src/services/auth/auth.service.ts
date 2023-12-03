import axios from "axios";

import constants from "@/constants";
import {Token} from "@/models/token.ts";
import {ErrorMessage} from "@/models/errorMessage.ts";
import {getContentType} from "@/api/api.helper.ts";
import {ILogin, IRegister} from "@/services/auth/auth.types.ts";
import {setLocalStorage} from "@/utils/localStorage.utils.ts";

const sendTokenRequest = async (data: Token | ILogin | IRegister, path: string): Promise<Token | null> => {
    return await axios.post<Token | ErrorMessage>(`${constants.baseUrl}${path}`, {...data}, {
        headers: getContentType()
    }).then((response) => {
        if ((response.data as Token).accessToken) {
            setLocalStorage(constants.authTokenKey, response.data as Token)

            return response.data as Token;
        }

        return null;
    });
}

export const authService = {
    async login(data: ILogin): Promise<Token | null> {
        return await sendTokenRequest(data, "/api/v1/auth")
    },
    async register(data: IRegister): Promise<Token | null> {
        return await sendTokenRequest(data, "/api/v1/auth/register")
    },
    async refreshToken(token: Token): Promise<Token | null> {
        return await sendTokenRequest(token, "/api/v1/auth/refresh")
    }
}

export default authService;