import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {CreateColumnDto} from "@/services/column/column.types.ts";
import SwitchCheckbox from "@/components/ui/forms/switchCheckbox/SwitchCheckbox.tsx";
import styles from "./CreateColumnForm.module.scss"

type CreateColumnFormProps = {
    onSubmit: (data: CreateColumnDto) => void;
}

const CreateColumnForm: FC<CreateColumnFormProps> = ({onSubmit}) => {
    const {register, handleSubmit, reset} = useForm<CreateColumnDto>();

    const submit = (data: CreateColumnDto) => {
        onSubmit({...data, isCompleted: isChecked})
        reset()
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
            <div>
                <input
                    type="text"
                    placeholder="Column name"
                    {...register("columnName", {required: true})}
                    className={styles.createColumnForm__form__field__input}
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
                    Add column
                </button>
            </div>
        </form>
    );
};

export default CreateColumnForm;