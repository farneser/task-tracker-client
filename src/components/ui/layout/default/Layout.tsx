import { FC, useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Footer from "@/components/ui/layout/footer/Footer.tsx";
import useLayout from "@/hooks/useLayout.ts";

const Layout: FC = () => {
    const { isFooterVisible, isTextPage, isMobileWidth } = useLayout();
    const layoutRef = useRef<HTMLDivElement>(null);
    const [isLayoutTallerThanScreen, setIsLayoutTallerThanScreen] = useState(false);

    const getHeight = () => {
        const height = {
            height: "",
            maxHeight: "",
        };

        if (isLayoutTallerThanScreen) {
            height.height = "auto";
            height.maxHeight = "none";
        }

        return height;
    };

    const checkLayoutHeight = () => {
        if (layoutRef.current) {
            const layoutHeight = layoutRef.current.scrollHeight;
            const screenHeight = window.innerHeight;
            console.log(`Layout height: ${layoutHeight}, Screen height: ${screenHeight}`);
            setIsLayoutTallerThanScreen(layoutHeight > screenHeight);
        }
    };

    useEffect(() => {
        checkLayoutHeight();

        window.addEventListener("resize", checkLayoutHeight);

        return () => {
            window.removeEventListener("resize", checkLayoutHeight);
        };
    }, []);

    useEffect(() => {
        checkLayoutHeight();
    }, [isTextPage, isMobileWidth]);

    return (
        <div
            ref={layoutRef}
            className={styles.layout__container}
            style={getHeight()}
        >
            <div className={styles.layout__content}>
                <Outlet />
            </div>
            {(isFooterVisible || isTextPage) && (
                <footer>
                    <Footer />
                </footer>
            )}
        </div>
    );
};

export default Layout;
