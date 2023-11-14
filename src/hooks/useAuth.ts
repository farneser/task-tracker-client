import {useContext} from "react";
import {AuthContext, IAuthContext} from "@/components/providers/AuthProvider.tsx";

const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};

export default useAuth;