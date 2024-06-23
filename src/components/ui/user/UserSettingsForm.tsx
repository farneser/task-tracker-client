import {FC, useState} from "react";
import {UserView} from "@/services/user/user.types.ts";
import {useForm} from "react-hook-form";
import SwitchCheckbox from "@/components/ui/forms/switchCheckbox/SwitchCheckbox.tsx";
import styles from "./UserSettingsForm.module.scss";
import {useLocalization} from "@/hooks/useLocalization.ts";
import {userService} from "@/services/user/user.service.ts";

interface UserSettingsFormProps {
    user: UserView;
    onSubmit: (data: UserView) => void;
}

const UserSettingsForm: FC<UserSettingsFormProps> = ({user, onSubmit}) => {
    const {handleSubmit} = useForm<UserView>({defaultValues: user});
    const [isChecked, setIsChecked] = useState(!user ? false : user.isSubscribed);
    const [statsSent, setStatsSent] = useState(false);

    const {translations} = useLocalization();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const submit = (data: UserView) => {
        onSubmit({...data, isSubscribed: isChecked})
    }

    const sendStatistics = async () => {
        await userService.getStatistics()

        setStatsSent(true);
        setTimeout(() => setStatsSent(false), 1500);
    }

    return <>
        <div className={styles.form}>
            <div>
                <h1>{translations.userSettings.header}</h1>
            </div>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label style={{margin: "0"}} className={styles.form__label}>
                                {translations.userSettings.emailNotifications}
                            </label>
                        </td>
                        <td style={{transform: "scale(0.8)"}}>
                            <SwitchCheckbox isChecked={isChecked} onCheckboxChange={handleCheckboxChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    className={styles.form__button}
                    onClick={() => sendStatistics()}
                >
                    {statsSent ? translations.userSettings.stats.sent : translations.userSettings.stats.get}
                </button>
            </div>
            <div>
                <button
                    onClick={handleSubmit(submit)}
                    type="submit"
                    className={styles.form__button}
                >
                    {translations.userSettings.save}
                </button>
            </div>
        </div>

    </>
}

export default UserSettingsForm;