import constants from "@/src/constants";
import {Token} from "@/src/models/token";
import axios from "axios";
import {getContentType} from "@/src/api/api.helper";
import {ErrorMessage} from "@/src/models/errorMessage";
import {setLocalStorage} from "@/src/utils/localStorage.utils";

export const authService = {
    async refreshToken(token: Token): Promise<Token | null> {

        const response = await axios.post<Token | ErrorMessage>(`${constants.baseUrl}/api/v1/auth/refresh`, token, {
            headers: getContentType()
        });

        if ((response.data as Token).access_token) {
            const data = response.data as Token;

            setLocalStorage(constants.authTokenKey, data)
            return data;
        }

        return null;
    }
}

export default authService;