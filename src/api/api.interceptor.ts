import axios from "axios";
import {Token} from "@/src/models/token";
import {getLocalStorageItem} from "@/src/utils/localStorage.utils";
import constants from "@/src/constants";

const instance = axios.create({
    baseURL: constants.baseUrl,
    headers: {
        Authorization: `Bearer ${getLocalStorageItem<Token>(constants.authTokenKey)?.access_token}`
    }
})

axios.interceptors.request.use(async req => {
    const token = getLocalStorageItem<Token>(constants.authTokenKey)

    req.headers.Authorization = `Bearer ${token?.access_token}`

    return req;
})

export default instance;