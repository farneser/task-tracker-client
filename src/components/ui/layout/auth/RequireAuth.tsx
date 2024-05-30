import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Header from "@/components/ui/layout/header/Header.tsx";
import {useEffect, useState} from "react";
import Loader from "@/components/ui/loader/Loader.tsx";
import SideBar from "@/components/ui/layout/sidebar/SideBar.tsx";
import styles from "./RequireAuth.module.scss";

const RequireAuth = () => {
    const location = useLocation();
    const {refreshAuth, user, getToken, loading} = useAuth();
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true)

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

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible)
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
                {<div className={`${styles.sidebar} ${isSidebarVisible ? styles.show : styles.hide}`}>
                    <SideBar/>
                </div>}
                <div className={styles.sidebar__switch} onClick={toggleSidebar} style={{cursor: "pointer"}}>
                    <div className={`${styles.sidebar__switch__container} ${isSidebarVisible ? styles.left : styles.right}`}/>
                </div>
            </div>
            <div className={styles.main__content__container}>
                <Outlet/>
            </div>
        </main>
    </>;
}

export default RequireAuth;

