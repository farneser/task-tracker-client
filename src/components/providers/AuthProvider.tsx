import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {UserView} from "@/services/user/user.types.ts";
import {userService} from "@/services/user/user.service.ts";
import {Token} from "@/models/token.ts";
import {getLocalStorageItem, removeLocalStorage, setLocalStorage} from "@/utils/localStorage.utils.ts";
import constants from "@/constants.ts";
import {Message} from "@/models/Message.ts";

export interface IAuthContext {
    updateToken: (token: Token | null) => void;
    getToken: () => Token | null;
    refreshAuth: () => void;
    user: UserView | null;
    loading: boolean;
    logout: () => void;
    error: Message | null;
    patchUser: (user: UserView) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<UserView | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Message | null>(null);

    const refreshAuth = async () => {
        setLoading(true);
        userService
            .get()
            .then((user) => {
                setUser(user);
            })
            .catch((e) => {
                setError(e?.response?.data);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const updateToken = (newToken: Token | null) => {
        if (newToken) {
            setLocalStorage(constants.authTokenKey, newToken);
        } else {
            removeLocalStorage(constants.authTokenKey);
        }

        return newToken;
    };

    const logout = async () => {
        updateToken(null);
        setUser(null);
    }

    const getToken = (): Token | null => {
        return getLocalStorageItem<Token>(constants.authTokenKey);
    }

    const patchUser = async (user: UserView) => {
        setLoading(true);
        userService
            .patch({isSubscribed: user.isSubscribed})
            .then((user) => {
                setUser(user);
            })
            .catch((e) => {
                setError(e?.response?.data);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        refreshAuth().then()
    }, []);

    return (
        <AuthContext.Provider value={{updateToken, getToken, user, refreshAuth, loading, logout, error, patchUser}}>
            {children}
        </AuthContext.Provider>
    );
};