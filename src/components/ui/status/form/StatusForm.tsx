import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {PatchStatusDto, StatusView} from "@/services/status/status.types.ts";
import styles from "./StatusForm.module.scss";
import SwitchCheckbox from "@/components/ui/forms/switchCheckbox/SwitchCheckbox.tsx";
import {useLocalization} from "@/hooks/useLocalization.ts";
import ColorPicker from "@/components/ui/forms/colorPicker/ColorPicker.tsx";

type StatusFormProps = {
    status?: StatusView;
    onSubmit: (data: PatchStatusDto) => void;
}

const StatusForm: FC<StatusFormProps> = ({onSubmit, status}) => {
    const {translations} = useLocalization();

    const [colorError, setColorError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setFocus,
        setValue
    } = useForm<PatchStatusDto>({defaultValues: status});

    const [isChecked, setIsChecked] = useState(!status ? false : status.isCompleted);

    useEffect(() => {
        setFocus("statusName");
    }, [setFocus]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const submit = (data: PatchStatusDto) => {
        let color = data.statusColor.trim();

        if (color.length === 4) {
            color = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
        } else if (color.length !== 7) {
            setColorError(true)
            return;
        }

        // Далее обрабатываем остальную часть submit
        onSubmit({...data, statusColor: color, isCompleted: isChecked});
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
            <ColorPicker error={colorError} setColor={(color) => {
                setValue("statusColor", color)
            }}/>
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