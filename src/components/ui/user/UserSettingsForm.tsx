import {FC, useState} from "react";
import {UserView} from "@/services/user/user.types.ts";
import {useForm} from "react-hook-form";
import SwitchCheckbox from "@/components/ui/forms/switchCheckbox/SwitchCheckbox.tsx";
import styles from "./UserSettingsForm.module.scss";

interface UserSettingsFormProps {
    user: UserView;
    onSubmit: (data: UserView) => void;
}

const UserSettingsForm: FC<UserSettingsFormProps> = ({user, onSubmit}) => {
    const {handleSubmit} = useForm<UserView>({defaultValues: user});
    const [isChecked, setIsChecked] = useState(!user ? false : user.isSubscribed);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const submit = (data: UserView) => {
        onSubmit({...data, isSubscribed: isChecked})
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>User settings</h1>
        </div>
        <div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label style={{margin: "0"}} className={styles.form__label}>
                            Subscribe for email notifications
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
            <button type="submit" className="form__button">Save settings</button>
        </div>
    </form>
}

export default UserSettingsForm;