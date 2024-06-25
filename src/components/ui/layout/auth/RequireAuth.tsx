import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import Header from "@/components/ui/layout/header/Header.tsx";
import {memo, useEffect} from "react";
import Loader from "@/components/ui/loader/Loader.tsx";
import SideBar from "@/components/ui/layout/sidebar/SideBar.tsx";
import styles from "./RequireAuth.module.scss";
import useLayout from "@/hooks/useLayout.ts";

const RequireAuth = () => {
    const location = useLocation();
    const {refreshAuth, user, getToken, loading} = useAuth();

    const {toggleSidebar, isHeaderVisible, isSidebarVisible, isMobileWidth} = useLayout();

    useEffect(() => {
        if (!user) {
            refreshAuth();
        }
    }, [refreshAuth, user]);


    const getNavigatePath = () => {
        return `/auth/login?redirect=${location.pathname}`;
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
            {isHeaderVisible && <header>
                <MemoHeader/>
            </header>}
            <main>
                <div
                    className={`${styles.main__sidebar__container} ${isMobileWidth ? styles.main__sidebar__container_mobile : ""}`}
                    style={width}
                >
                    <div className={`${styles.sidebar} ${isSidebarVisible ? styles.show : styles.hide}`}>
                        <SideBar onProjectClick={onProjectClick} onMainClick={toggleSidebar}/>
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
                <div
                    className={styles.main__content__container}
                    style={{display: isMobileWidth && isSidebarVisible ? "none" : "block"}}
                >
                    <Outlet/>
                </div>
            </main>
        </>
    );
}

const MemoHeader = memo(Header);

export default RequireAuth;
