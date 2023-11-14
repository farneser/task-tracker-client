import {createContext, FC, PropsWithChildren, useState} from "react";
import {Token} from "@/models/token.ts";
import {getLocalStorageItem} from "@/utils/localStorage.utils.ts";
import constants from "@/constants.ts";

interface IAuthContext {
    token: Token | null;
    updateToken: (token: Token) => void;
    removeToken: () => void;
}


export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [token, setToken] = useState<Token | null>(() => getLocalStorageItem(constants.authTokenKey));

    const updateToken = (token: Token) => {
        setToken(token);
    };

    const removeToken = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{token, updateToken, removeToken}}>
            {children}
        </AuthContext.Provider>
    );
};