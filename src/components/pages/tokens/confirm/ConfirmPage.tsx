import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import authService from "@/services/auth/auth.service.ts";
import styles from "./ConfirmPage.module.scss";
import {useLocalization} from "@/hooks/useLocalization.ts";

const ConfirmPage: FC = () => {
    const {translations} = useLocalization();
    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState(false);
    const [isValidTokenBlock, setIsValidTokenBlock] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const token = queryParams.get('token')

        const checkTokenValidity = async () => {
            try {
                const data = await authService.confirm(token!)
                console.log(data)
                if (data) {
                    console.log("if")
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

    useEffect(() => {
        if (isValidToken){
            setIsValidTokenBlock(true)
        }
    }, [isValidToken]);

    const handleReturnHome = () => {
        navigate('/p');
    };

    return <div className={styles.page}>
        <div className={styles.form + " " + styles.page__container}>
            {isValidTokenBlock ? (
                <div>
                    <h1 className={styles.title}>{translations.confirmEmailPage.successfullyConfirm}</h1>
                </div>
            ) : (
                <div>
                    <h1 className={styles.title}>{translations.confirmEmailPage.error.title}</h1>
                    <p className={styles.message}>{translations.confirmEmailPage.error.message}</p>
                </div>
            )}
            <button
                className={styles.form__button}
                onClick={handleReturnHome}
            >{translations.confirmEmailPage.home}</button>
        </div>
    </div>
};


export default ConfirmPage;