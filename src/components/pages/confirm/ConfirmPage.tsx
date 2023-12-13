import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import authService from "@/services/auth/auth.service.ts";
import styles from "./ConfirmPage.module.scss"

const ConfirmPage: FC = () => {
    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const token = queryParams.get('token')

        const checkTokenValidity = async () => {
            try {
                const data = await authService.confirm(token!)

                if (data) {
                    setIsValidToken(true);
                } else {
                    setIsValidToken(false);
                }
            } catch (error) {
                setIsValidToken(false);
            }
        };

        if (token) {
            checkTokenValidity().then();
        } else {
            setIsValidToken(false);
        }
    }, []);

    const handleReturnHome = () => {
        navigate('/');
    };

    return <div className={styles.page}>
        <div className={styles.form + " " + styles.page__container}>
            {isValidToken ? (
                <div>
                    <h1 className={styles.title}>Email confirmation successful!</h1>
                </div>
            ) : (
                <div>
                    <h1 className={styles.title}>Email confirmation error</h1>
                    <p className={styles.message}>Perhaps the link has expired or the token is invalid.</p>
                </div>
            )}
            <button className={styles.form__button} onClick={handleReturnHome}>Return to Home</button>
        </div>
    </div>
};


export default ConfirmPage;