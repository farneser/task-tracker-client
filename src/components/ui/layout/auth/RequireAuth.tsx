import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Footer from "@/components/ui/layout/footer/Footer.tsx";
import Header from "@/components/ui/layout/header/Header.tsx";

const RequireAuth = () => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth.getToken()) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>;
    }

    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>;
}

export default RequireAuth;

