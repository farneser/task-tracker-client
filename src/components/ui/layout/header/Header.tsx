import {FC, useEffect} from "react";
import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth.ts";
import useColumns from "@/hooks/useColumns.ts";
import useTasks from "@/hooks/useTasks.ts";

const Header: FC = () => {
    const {user, logout, loading} = useAuth();
    const {updateColumns} = useColumns()
    const {updateTasks} = useTasks()

    useEffect(() => {
        refresh().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user]);

    const refresh = async () => {
        await updateColumns().then()
        await updateTasks().then()
    }

    return <header className={styles.header}>
        <div className={styles.header__container}>
            <button className={styles.header__refresh} onClick={refresh}>Refresh tasks</button>
            <div className={styles.header__user}>
                <span className={styles.header__user_email}>You are logged in as: {user?.email}</span>
            </div>

            <button className={styles.header__logout} onClick={logout}>Logout</button>
        </div>
    </header>
}

export default Header;