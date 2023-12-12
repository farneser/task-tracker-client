import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Footer from "@/components/ui/layout/footer/Footer.tsx";

const RequireAuth = () => {
    const location = useLocation();
    const auth = useAuth();

    if (!auth.getToken()) {
        return <Navigate to="/auth/login" state={{from: location}} replace/>;
    }

    return <>
        <header>header data</header>
        <Outlet/>
        <Footer/>
    </>;
}

export default RequireAuth;

