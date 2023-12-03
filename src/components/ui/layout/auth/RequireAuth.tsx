import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";

const RequireAuth = () => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth.getToken()) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>;
    }

    return <Outlet/>;
}

export default RequireAuth;

