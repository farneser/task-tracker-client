import {createContext, FC, PropsWithChildren} from "react";
import {Token} from "@/models/token.ts";
import {getLocalStorageItem, removeLocalStorage, setLocalStorage} from "@/utils/localStorage.utils.ts";
import constants from "@/constants.ts";

export interface IAuthContext {
    updateToken: (token: Token | null) => void;
    getToken: () => Token | null
}


export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const updateToken = (token: Token | null) => {
        if (token) {
            setLocalStorage(constants.authTokenKey, token)
        } else {
            removeLocalStorage(constants.authTokenKey);
        }
    };

    const getToken = (): Token | null => {
        return getLocalStorageItem<Token>(constants.authTokenKey);
    }

    return (
        <AuthContext.Provider value={{updateToken, getToken}}>
            {children}
        </AuthContext.Provider>
    );
};