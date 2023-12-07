
import { FC } from "react";
import { PatchTaskDto, TaskView } from "@/services/task/task.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import { taskService } from "@/services/task/task.service.ts";
import PatchTaskForm from "@/components/ui/task/patch/PatchTaskForm.tsx";

import styles from "./TaskElement.module.scss";

type TaskElementProps = {
    task: TaskView;
    deleteTask?: () => void;
    updateTask?: (data: TaskView) => void;
};

const TaskElement: FC<TaskElementProps> = ({ task, deleteTask, updateTask }) => {
    const { reversePopup, closePopup, Popup } = usePopup();

    const onSubmit = async (data: PatchTaskDto) => {
        const dto = await taskService.patch(task.id, data);

        if (updateTask) {
            updateTask(dto);
        }

        closePopup();
    };

    return (
        <div className={styles["task-container"]}>
            <div className={styles["task-header"]}>{task.taskName}</div>
            <p className={styles["task-description"]}>{task.description}</p>

            {deleteTask && (
                <div className={styles["button-container"]}>
                    <button onClick={deleteTask}>Delete</button>
                </div>
            )}

            {updateTask && (
                <div className={styles["button-container"]}>
                    <button className={styles["edit-button"]} onClick={reversePopup}>
                        Edit
                    </button>

                    <Popup>
                        <div>
                            <h4>Edit Task</h4>
                            <PatchTaskForm onSubmit={onSubmit} task={task} />
                        </div>
                    </Popup>
                </div>
            )}
        </div>
    );
};

export default TaskElement;
