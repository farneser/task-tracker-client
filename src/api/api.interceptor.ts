import axios from "axios";
import {Token} from "@/models/token";
import {getLocalStorageItem, removeLocalStorage} from "@/utils/localStorage.utils";
import constants from "@/constants";
import authService from "@/services/auth/auth.service.ts";

const axiosInstance = axios.create({
    baseURL: constants.baseUrl,
    headers: {
        Authorization: `Bearer ${getLocalStorageItem<Token>(constants.authTokenKey)?.accessToken}`
    }
});

axiosInstance.interceptors.request.use(async req => {
    const token = getLocalStorageItem<Token>(constants.authTokenKey)

    req.headers.Authorization = `Bearer ${token?.accessToken}`

    return req;
});

axiosInstance.interceptors.response.use(async res => res, async error => {

    const request = error.config;

    if (error.response == undefined) {
        removeLocalStorage(constants.authTokenKey)
    } else if (error.response.status == 401) {
        if ((error.response.data.status == constants.statuses.ACCESS_TOKEN_EXPIRED) && !request._isRetry) {

            request._isRetry = true;

            try {
                await authService.refreshToken()

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