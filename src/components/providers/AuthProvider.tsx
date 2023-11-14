import {createContext, FC, PropsWithChildren, useState} from "react";
import {Token} from "@/models/token.ts";
import {getLocalStorageItem, removeLocalStorage, setLocalStorage} from "@/utils/localStorage.utils.ts";
import constants from "@/constants.ts";

export interface IAuthContext {
    token: Token | null;
    updateToken: (token: Token | null) => void;
}


export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [token, setToken] = useState<Token | null>(() => getLocalStorageItem(constants.authTokenKey));

    const updateToken = (token: Token | null) => {
        setToken(token);

        if (token) {
            setLocalStorage(constants.authTokenKey, token)
        } else {
            removeLocalStorage(constants.authTokenKey);
        }
    };

    return (
        <AuthContext.Provider value={{token, updateToken}}>
            {children}
        </AuthContext.Provider>
    );
};