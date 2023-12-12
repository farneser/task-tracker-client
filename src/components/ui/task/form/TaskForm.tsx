import {FC} from "react";
import {PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import {useForm} from "react-hook-form";
import styles from "./TaskForm.module.scss";

type PatchTaskFormProps = {
    task?: TaskLookupView;
    columnId: number;
    onSubmit: (data: PatchTaskDto) => void;
}

const TaskForm: FC<PatchTaskFormProps> = ({onSubmit, task, columnId}) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<PatchTaskDto>({defaultValues: task});

    const submit = (data: PatchTaskDto) => {
        onSubmit({...data, columnId})
        reset()
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>{task ? "Update task" : "Create a new task"}</h1>
        </div>
        <div>
            <label className={styles.form__label}>taskName</label>
            <input type="text" placeholder="columnName" {...register("taskName")} autoFocus={true}/>
        </div>
        <div>
            <label className={styles.form__label}>description</label>
            <input type="text" placeholder="description" {...register("description")} />
        </div>
        <div>
            <button type="submit" className="form__button">
                {task ? "Update task" : "Add task"}
            </button>
        </div>
    </form>
}

export default TaskForm;