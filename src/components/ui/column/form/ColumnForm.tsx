import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import styles from "./ColumnForm.module.scss";
import SwitchCheckbox from "@/components/ui/forms/switchCheckbox/SwitchCheckbox.tsx";

type PatchColumnFormProps = {
    column?: ColumnView;
    onSubmit: (data: PatchColumnDto) => void;
}

const ColumnForm: FC<PatchColumnFormProps> = ({onSubmit, column}) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<PatchColumnDto>({defaultValues: column});

    const [isChecked, setIsChecked] = useState(!column ? false : column.isCompleted);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const submit = (data: PatchColumnDto) => {
        onSubmit({...data, isCompleted: isChecked})
        reset()
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>{column ? "Update column" : "Create a new column"}</h1>
        </div>
        <div>
            <input
                type="text"
                placeholder="Column name"
                {...register("columnName", {required: true})}
                className={styles.createColumnForm__form__field__input}
                autoFocus={true}
            />
        </div>
        <div className={styles.createColumnForm__form__field}>
            <label className={styles.form__label}>Mark tasks in this list as completed</label>
            <SwitchCheckbox
                isChecked={isChecked}
                onCheckboxChange={handleCheckboxChange}
            />
        </div>
        <div>
            <button type="submit" className="form__button">
                {column ? "Update column" : "Add column"}
            </button>
        </div>
    </form>
}

export default ColumnForm;