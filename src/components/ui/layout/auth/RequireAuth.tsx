import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Header from "@/components/ui/layout/header/Header.tsx";
import {memo, useEffect, useState} from "react";
import Loader from "@/components/ui/loader/Loader.tsx";
import SideBar from "@/components/ui/layout/sidebar/SideBar.tsx";
import styles from "./RequireAuth.module.scss";

const RequireAuth = () => {
    const location = useLocation();
    const {refreshAuth, user, getToken, loading} = useAuth();

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(true);

    useEffect(() => {
        if (!user) {
            refreshAuth();
        }
    }, [refreshAuth, user]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileWidth(window.innerWidth < 768);
            if (!isSidebarToggled) {
                setIsSidebarVisible(window.innerWidth >= 768);
            }
        };

        handleResize()

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [isSidebarToggled]);

    const getNavigatePath = () => {
        return `/auth/login?redirect=${location.pathname}`;
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        setIsSidebarToggled(true);
    };

    if (loading) {
        return <Loader/>;
    }

    if (!getToken()) {
        return <Navigate to={getNavigatePath()} state={{from: location}} replace/>;
    }

    const width = {
        maxWidth: isSidebarVisible ? undefined : "2.5%",
        minWidth: isSidebarVisible ? undefined : "2.5%"
    };

    const onProjectClick = () => {
        if (isMobileWidth) {
            toggleSidebar()
        }
    }

    return (
        <>
            <header>
                <MemoHeader/>
            </header>
            <main>
                <div
                    className={`${styles.main__sidebar__container} ${isMobileWidth ? styles.main__sidebar__container_mobile : ""}`}
                    style={width}
                >
                    <div className={`${styles.sidebar} ${isSidebarVisible ? styles.show : styles.hide}`}>
                        <SideBar onProjectClick={onProjectClick}/>
                    </div>
                    <div
                        className={styles.sidebar__switch}
                        onClick={toggleSidebar}
                        style={{cursor: "pointer"}}
                    >
                        <div
                            className={`${styles.sidebar__switch__container} ${isSidebarVisible ? styles.left : styles.right}`}
                        />
                    </div>
                </div>
                <div className={styles.main__content__container}
                     style={{display: isMobileWidth && isSidebarVisible ? "none" : "block"}}>
                    <Outlet/>
                </div>
            </main>
        </>
    );
}

const MemoHeader = memo(Header);

export default RequireAuth;
