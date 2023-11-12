import axios from "axios";
import {Token} from "@/src/models/token";
import {getLocalStorageItem, removeLocalStorage} from "@/src/utils/localStorage.utils";
import constants from "@/src/constants";
import authService from "@/src/services/auth/auth.service";

const axiosInstance = axios.create({
    baseURL: constants.baseUrl,
    headers: {
        Authorization: `Bearer ${getLocalStorageItem<Token>(constants.authTokenKey)?.access_token}`
    }
});

axios.interceptors.request.use(async req => {
    const token = getLocalStorageItem<Token>(constants.authTokenKey)

    req.headers.Authorization = `Bearer ${token?.access_token}`

    return req;
});

axios.interceptors.response.use(async res => res, async error => {

    const request = error.config;

    if (error.response.status == 401) {
        if ((error.response.body.status == constants.statuses.ACCESS_TOKEN_EXPIRED) && !error.config._isRetry) {
            error.config._isRetry = true;
            try {
                const token = getLocalStorageItem<Token>(constants.authTokenKey);

                if (token) {
                    await authService.refreshToken(token)
                }

                return axiosInstance.request(request);
            } catch (e) {
                removeLocalStorage(constants.authTokenKey)
            }
        } else {
            removeLocalStorage(constants.authTokenKey)
        }
    }

})

export default axiosInstance;