import {FC} from "react";
import styles from "./WelcomePage.module.scss";
import {useNavigate} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";

const WelcomePage: FC = () => {
    const navigate = useNavigate();

    const {translations} = useLocalization();

    const login = () => {
        navigate("/auth/login")
    }

    const register = () => {
        navigate("/auth/register")
    }

    const dashboard = () => {
        navigate("/p")
    }

    const {user} = useAuth();

    return <div className={styles.page} style={{margin: "0 auto"}}>
        <div className={styles.form}>
            <div className={styles.title}>{translations.welcomePage.title}</div>
            <div className={styles.message}>
                {translations.welcomePage.message}
            </div>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <button className={styles.form__button} onClick={register}>{translations.welcomePage.register}</button>
                <button className={styles.form__button} onClick={login}>{translations.welcomePage.login}</button>
                {user && <button className={styles.form__button}
                                 onClick={dashboard}>{translations.welcomePage.dashboard}</button>}
            </div>
        </div>
    </div>
}

export default WelcomePage;