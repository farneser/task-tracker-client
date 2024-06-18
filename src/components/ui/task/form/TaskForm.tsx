import {FC, useEffect} from "react";
import {PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import {useForm} from "react-hook-form";
import styles from "./TaskForm.module.scss";
import {useLocalization} from "@/hooks/useLocalization.ts";
import useMembers from "@/hooks/useMembers.ts";
import useProjectId from "@/hooks/useProjectId.ts";
import useStatuses from "@/hooks/useStatuses.ts";

type PatchTaskFormProps = {
    task?: TaskLookupView;
    statusId?: number;
    onSubmit: (data: PatchTaskDto) => void;
}

const TaskForm: FC<PatchTaskFormProps> = ({onSubmit, task, statusId}) => {
    const {translations} = useLocalization();
    const {projectId} = useProjectId();
    const {members} = useMembers(projectId);

    const {statuses} = useStatuses(projectId)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setFocus
    } = useForm<PatchTaskDto>({defaultValues: task});

    useEffect(() => {
        setFocus("taskName");
    }, [setFocus]);

    const submit = (data: PatchTaskDto) => {
        onSubmit({...data, statusId: task == null && statusId ? statusId : data.statusId});
        reset();
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>{task ? translations.taskForm.headingEdit : translations.taskForm.headingCreate}</h1>
        </div>
        <div>
            <label className={styles.form__label}>{translations.taskForm.title.label}</label>
            <input className={styles.form__input}
                   placeholder={translations.taskForm.title.placeholder}
                   {...register("taskName", {
                       required: translations.taskForm.title.required,
                       minLength: {
                           value: 1,
                           message: translations.taskForm.title.minLength
                       },
                       maxLength: {
                           value: 255,
                           message: translations.taskForm.title.maxLength
                       }
                   })}/>
            {errors.taskName && <p className={styles.form__error}>{errors.taskName.message}</p>}
        </div>
        <div>
            <label className={styles.form__label}>{translations.taskForm.description.label}</label>
            <textarea className={styles.form__input + " " + styles.form__input_area}
                      placeholder={translations.taskForm.description.placeholder}
                      {...register("description")} />
        </div>
        {task && <div>
            <label className={styles.form__label}>{translations.taskForm.statusId}</label>
            <select className={styles.form__input} {...register("statusId")}>
                {statuses.map((s) =>
                    <option value={s.id}>{s.statusName}</option>
                )}
            </select>
        </div>}
        <div>
            <label className={styles.form__label}>{translations.taskForm.assignedFor.label}</label>
            <select className={styles.form__input} {...register("assignedUserId")}>
                <option value={-1}>{translations.taskForm.assignedFor.notAssigned}</option>
                {members.list.map((m) =>
                    <option value={m.userId}>{m.username}</option>
                )}
            </select>
        </div>
        <div>
            <button type="submit" className={styles.form__button}>
                {task ? translations.taskForm.submitEdit : translations.taskForm.submitCreate}
            </button>
        </div>
    </form>
}

export default TaskForm;