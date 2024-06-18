import {FC} from "react";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";
import Footer from "@/components/ui/layout/footer/Footer.tsx";
import useLayout from "@/hooks/useLayout.ts";

const Layout: FC = () => {
    const {isFooterVisible} = useLayout();

    return <div className={styles.layout__container}>
        <Outlet/>
        {isFooterVisible && <footer>
            <Footer/>
        </footer>}
    </div>
}

export default Layout