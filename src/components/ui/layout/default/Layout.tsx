import {FC} from "react";
import {Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout: FC = () => {
    return <div className={styles.layout__container}>
        <Outlet/>
    </div>
}

export default Layout