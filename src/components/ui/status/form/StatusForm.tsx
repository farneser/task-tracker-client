import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {PatchStatusDto, StatusView} from "@/services/status/status.types.ts";
import styles from "./StatusForm.module.scss";
import SwitchCheckbox from "@/components/ui/forms/switchCheckbox/SwitchCheckbox.tsx";
import {useLocalization} from "@/hooks/useLocalization.ts";

type StatusFormProps = {
    status?: StatusView;
    onSubmit: (data: PatchStatusDto) => void;
}

const StatusForm: FC<StatusFormProps> = ({onSubmit, status}) => {
    const {translations} = useLocalization();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setFocus
    } = useForm<PatchStatusDto>({defaultValues: status});

    const [isChecked, setIsChecked] = useState(!status ? false : status.isCompleted);

    useEffect(() => {
        setFocus("statusName");
    }, [setFocus]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const submit = (data: PatchStatusDto) => {
        onSubmit({...data, isCompleted: isChecked});
        reset();
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>{status ? translations.statusForm.headingEdit : translations.statusForm.headingCreate}</h1>
        </div>
        <div>
            <input
                type="text"
                placeholder={translations.statusForm.statusName.placeholder}
                {...register("statusName", {
                    required: translations.statusForm.statusName.required,
                    minLength: {value: 1, message: translations.statusForm.statusName.minLength},
                    maxLength: {value: 255, message: translations.statusForm.statusName.maxLength}
                })}
                className={styles.createColumnForm__form__field__input}
            />
            {errors.statusName && <p className={styles.form__error}>{errors.statusName.message}</p>}
        </div>
        <div>
            <input
                type="text"
                placeholder={translations.statusForm.statusColor.placeholder}
                {...register("statusColor", {
                    required: translations.statusForm.statusColor.required,
                    minLength: {value: 4, message: translations.statusForm.statusColor.minLength},
                    maxLength: {value: 7, message: translations.statusForm.statusColor.maxLength},
                    pattern: {
                        value: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
                        message: translations.statusForm.statusColor.invalid
                    }
                })}
                className={styles.createColumnForm__form__field__input}
            />
            {errors.statusName && <p className={styles.form__error}>{errors.statusName.message}</p>}
        </div>
        <div className={styles.createColumnForm__form__field}>
            <label className={styles.form__label}>{translations.statusForm.isCompleted.label}</label>
            <SwitchCheckbox
                isChecked={isChecked}
                onCheckboxChange={handleCheckboxChange}
            />
        </div>
        <div>
            <button type="submit" className={styles.form__button}>
                {status ? translations.statusForm.submitEdit : translations.statusForm.submitCreate}
            </button>
        </div>
    </form>
}

export default StatusForm;