import axios from "axios";

import constants from "@/constants";
import {Token} from "@/models/token.ts";
import {ErrorMessage, Message} from "@/models/Message.ts";
import {getContentType} from "@/api/api.helper.ts";
import {ILogin, IRegister} from "@/services/auth/auth.types.ts";
import {setLocalStorage} from "@/utils/localStorage.utils.ts";

const sendTokenRequest = async (data: Token | ILogin | IRegister, path: string): Promise<Token | null> => {
    return await axios.post<Token>(`${constants.baseUrl}${path}`, {...data}, {
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
        return await sendTokenRequest({
            email: data.email,
            password: data.password
        }, "/api/v1/auth")
    },
    async register(data: IRegister): Promise<Token | null> {
        return await sendTokenRequest({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }, "/api/v1/auth/register")
    },
    async refreshToken(token: Token): Promise<Token | null> {
        return await sendTokenRequest({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }, "/api/v1/auth/refresh")
    },
    async confirm(id: string): Promise<Message | null> {
        const message = await axios.post<Message | ErrorMessage>(`${constants.baseUrl}/api/v1/auth/confirm?token=${id}`)

        if ((message.data as ErrorMessage).status != null) {
            return null
        }

        return message.data as Message
    }
}

export default authService;