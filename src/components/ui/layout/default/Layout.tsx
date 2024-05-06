import {FC} from "react";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";
import Footer from "@/components/ui/layout/footer/Footer.tsx";

const Layout: FC = () => {
    return <div className={styles.layout__container}>
        <Outlet/>
        <footer>
            <Footer/>
        </footer>
    </div>
}

export default Layout