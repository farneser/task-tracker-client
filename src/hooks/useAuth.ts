import {useContext} from "react";
import {AuthContext, IAuthContext} from "@/components/providers/AuthProvider.tsx";

const useAuth = (): IAuthContext | null => {
    return useContext(AuthContext);
};

export default useAuth;