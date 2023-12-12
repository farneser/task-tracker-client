import {FC} from "react";
import useAuth from "@/hooks/useAuth.ts";
import styles from "./Header.module.scss";

const Header: FC = () => {
    const {user, logout} = useAuth();

    return <header className={styles.header}>
        <div className={styles.header__container}>
            <button className={styles.header__refresh}>Refresh tasks</button>
            <div className={styles.header__user}>
                <span className={styles.header__user_email}>You are logged in as: {user?.email}</span>
            </div>
            <button className={styles.header__logout} onClick={logout}>Logout</button>
        </div>
    </header>
}

export default Header;