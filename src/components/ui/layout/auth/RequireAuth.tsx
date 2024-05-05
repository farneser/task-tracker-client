import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Footer from "@/components/ui/layout/footer/Footer.tsx";
import Header from "@/components/ui/layout/header/Header.tsx";
import {useEffect} from "react";
import Loader from "@/components/ui/loader/Loader.tsx";
import SideBar from "@/components/ui/layout/sidebar/SideBar.tsx";
import styles from "./RequireAuth.module.scss";

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

    const getNavigatePath = () => {
        return `/auth/login?redirect=${location.pathname}`
    }

    if (!getToken()) {
        return <Navigate to={getNavigatePath()} state={{from: location}} replace/>;
    }

    return <>
        <header>
            <Header/>
        </header>
        <main>
            <div className={styles.main__sidebar__container}>
                <SideBar/>
            </div>
            <div className={styles.main__content__container}>
                <Outlet/>
            </div>
        </main>
        <footer>
            <Footer/>
        </footer>
    </>;
}

export default RequireAuth;

