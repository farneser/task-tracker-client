import {FC, useEffect, useState} from "react";
import styles from "./AcceptInvitePage.module.scss";
import {useLocalization} from "@/hooks/useLocalization.ts";
import {useNavigate} from "react-router-dom";
import {inviteService} from "@/services/project/invite/invite.service.ts";
import {ProjectInviteToken} from "@/services/project/invite/invite.types.ts";

const AcceptInvitePage: FC = () => {
    const {translations} = useLocalization();
    const navigate = useNavigate();
    const [invite, setInvite] = useState<ProjectInviteToken | null>(null)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const token = queryParams.get('token')

        const checkTokenValidity = async () => {
            try {
                if (token) {
                    const data = await inviteService.getAccept(token)

                    if (data) {
                        setInvite(data)
                    } else {
                        setInvite(null)
                    }
                }
            } catch (error) {
                setInvite(null)
            }
        };

        if (token) {
            checkTokenValidity().then();
        } else {
            setInvite(null)
        }
    }, []);

    const handleReturnHome = () => {
        navigate('/p');
    };

    const acceptInvite = async () => {
        if (invite) {
            try {
                const response = await inviteService.accept(invite.token)

                navigate(`/p/${response.projectId}`);
            } catch (e) {
                navigate(`/auth/login?redirect=${location.pathname}?token=${invite.token}`)
            }
        }
    }

    return <div className={styles.page}>
        <div className={styles.form + " " + styles.page__container}>
            {invite ? (
                <>
                    <div>
                        <h1 className={styles.title}>{translations.acceptInvitePage.title}</h1>
                        <p className={styles.message}>{translations.acceptInvitePage.invite(invite.email, invite.projectName)}</p>
                    </div>
                    <div>
                        <button
                            className={styles.form__button}
                            onClick={acceptInvite}
                        >{translations.acceptInvitePage.accept}
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <h1 className={styles.title}>{translations.acceptInvitePage.error.title}</h1>
                    <p className={styles.message}>{translations.acceptInvitePage.error.message}</p>
                </div>
            )}
            <button
                className={styles.form__button}
                onClick={handleReturnHome}
            >{translations.confirmEmailPage.home}</button>
        </div>
    </div>
}

export default AcceptInvitePage;