import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import authService from "@/services/auth/auth.service.ts";
import {useEffect, useState} from "react";


const RequireAuth = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();

    const auth = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (auth && auth.token) {
                    const token = await authService.refreshToken(auth.token);

                    auth.updateToken(token);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData().then();
    }, [auth]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!auth || !auth.token) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>;
    }

    return <Outlet/>;
}

export default RequireAuth;