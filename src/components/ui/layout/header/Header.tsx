import {FC, useEffect} from "react";
import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth.ts";
import useColumns from "@/hooks/useColumns.ts";
import useTasks from "@/hooks/useTasks.ts";
import usePopup from "@/hooks/usePopup.tsx";
import SettingsIcon from "@/components/ui/icons/SettingsIcon.tsx";
import UserSettingsForm from "@/components/ui/user/UserSettingsForm.tsx";
import {UserView} from "@/services/user/user.types.ts";

const Header: FC = () => {
    const {user, logout, loading, patchUser} = useAuth();
    const {Popup, reversePopup, closePopup} = usePopup(false)

    const {updateColumns, setIsArchiveOpen, isArchiveOpen} = useColumns()
    const {archiveTasks} = useTasks()
    const {updateTasks} = useTasks()

    useEffect(() => {
        refresh().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user]);

    const refresh = async () => {
        await updateColumns().then()
        await updateTasks().then()
    }

    const onSettingsSubmit = (data: UserView) => {
        patchUser(data)
        closePopup()
    }

    return <header className={styles.header}>
        {user && <Popup>
            <UserSettingsForm user={user} onSubmit={onSettingsSubmit}/>
        </Popup>}

        <div className={styles.header__container}>
            <button className={styles.header__button} onClick={refresh}>Refresh tasks</button>
            <button className={styles.header__button} onClick={archiveTasks}>Archive tasks</button>
            <button className={styles.header__button} onClick={() => setIsArchiveOpen(!isArchiveOpen)}>
                {isArchiveOpen ? "Close archive" : "Open archive"}
            </button>

            <div className={styles.header__user} onClick={reversePopup}>
                <span>You are logged in as: <span className={styles.header__user_email}>{user?.email}</span></span>
                <span className={styles.header__settings}><SettingsIcon/></span>
            </div>

            <button className={styles.header__button} onClick={logout}>Logout</button>
        </div>
    </header>
}

export default Header;