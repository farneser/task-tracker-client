import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Footer from "@/components/ui/layout/footer/Footer.tsx";
import Header from "@/components/ui/layout/header/Header.tsx";
import {useEffect} from "react";
import Loader from "@/components/ui/loader/Loader.tsx";

const RequireAuth = () => {
    const location = useLocation();
    const {refreshAuth, user, getToken, loading} = useAuth();

    useEffect(() => {
        if (!user) {
            refreshAuth()
        }
    }, [refreshAuth, user]);

    if (loading) {
        return <Loader/>;
    }

    if (!getToken()) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>;
    }

    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>;
}

export default RequireAuth;

