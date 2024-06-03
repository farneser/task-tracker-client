import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Header from "@/components/ui/layout/header/Header.tsx";
import {useEffect, useState} from "react";
import Loader from "@/components/ui/loader/Loader.tsx";
import SideBar from "@/components/ui/layout/sidebar/SideBar.tsx";
import styles from "./RequireAuth.module.scss";
import {useWindowSize} from "@uidotdev/usehooks";

const RequireAuth = () => {
    const location = useLocation();

    const size = useWindowSize();

    const isMobileWidth = size.width != null && size.width < 768;
    const {refreshAuth, user, getToken, loading} = useAuth();

    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(!isMobileWidth);
    const [hasToggledSidebar, setHasToggledSidebar] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            refreshAuth()
        }
    }, [refreshAuth, user]);

    useEffect(() => {
        if (!hasToggledSidebar) {
            setIsSidebarVisible(!isMobileWidth);
        }
    }, [isMobileWidth, hasToggledSidebar]);

    if (loading) {
        return <Loader/>;
    }

    const getNavigatePath = () => {
        return `/auth/login?redirect=${location.pathname}`
    }

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        setHasToggledSidebar(true);
    }

    if (!getToken()) {
        return <Navigate to={getNavigatePath()} state={{from: location}} replace/>;
    }

    const width: { maxWidth?: string, minWidth?: string } = {}

    if (!isSidebarVisible) {
        width.maxWidth = "2.5%";
        width.minWidth = "2.5%";
    }

    return <>
        <header>
            <Header/>
        </header>
        <main>
            <div className={`${styles.main__sidebar__container} ${isMobileWidth ? styles.main__sidebar__container_mobile : ""}`} style={width}>
                <div className={`${styles.sidebar} ${isSidebarVisible ? styles.show : styles.hide}`}>
                    <SideBar/>
                </div>
                <div className={styles.sidebar__switch} onClick={toggleSidebar} style={{cursor: "pointer"}}>
                    <div className={`${styles.sidebar__switch__container} ${isSidebarVisible ? styles.left : styles.right}`}/>
                </div>
            </div>
            <div className={styles.main__content__container} style={{display: isMobileWidth && isSidebarVisible ? "none" : "block"}}>
                <Outlet/>
            </div>
        </main>
    </>;
}

export default RequireAuth;