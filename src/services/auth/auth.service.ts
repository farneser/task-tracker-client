import axios from "axios";

import constants from "@/constants";
import {Token} from "@/models/token.ts";
import {Message} from "@/models/Message.ts";
import {getContentType} from "@/api/api.helper.ts";
import {ILogin, IRegister} from "@/services/auth/auth.types.ts";
import {setLocalStorage} from "@/utils/localStorage.utils.ts";

const sendTokenRequest = async (data: ILogin | IRegister | null, path: string): Promise<Token | null> => {
    return await axios.post<Token>(`${constants.baseUrl}${path}`, {...data}, {
        headers: getContentType(),
        withCredentials: true
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
        return await sendTokenRequest({
            login: data.login,
            password: data.password
        }, "/api/v1/auth")
    },
    async register(data: IRegister): Promise<Token | null> {
        return await sendTokenRequest({
            username: data.username,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }, "/api/v1/auth/register")
    },
    async refreshToken(): Promise<Token | null> {
        return await sendTokenRequest(null, "/api/v1/auth/refresh")
    },
    async confirm(id: string): Promise<Message | null> {
        const message = await axios.post<Message>(`${constants.baseUrl}/api/v1/auth/confirm?token=${id}`)

        if ((message.data as Message).status != null) {
            return null
        }

        return message.data as Message
    }
}

export default authService;