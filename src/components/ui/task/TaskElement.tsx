import {FC} from "react";
import {PatchTaskDto, TaskView} from "@/services/task/task.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {taskService} from "@/services/task/task.service.ts";
import PatchTaskForm from "@/components/ui/task/patch/PatchTaskForm.tsx";

import styles from "./TaskElement.module.scss";
import {useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/components/ui/ItemTypes.ts";
import {CSS} from "@dnd-kit/utilities";

type TaskElementProps = {
    task: TaskView;
    deleteTask?: () => void;
    updateTask?: (data: TaskView) => void;
};

const TaskElement: FC<TaskElementProps> = ({task, deleteTask, updateTask}) => {
    const {reversePopup, closePopup, Popup} = usePopup();
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: ItemTypes.TASK,
            task,
        },
        // this can be used with a button to enable/disable dragging
        // or when the user is editing the column title
        // disabled: updateMode
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const onSubmit = async (data: PatchTaskDto) => {
        const dto = await taskService.patch(task.id, data);

        if (updateTask) {
            updateTask(dto);
        }

        closePopup();
    };

    if (isDragging) {
        return <div className={styles["task-container"]} style={{...style, backgroundColor: "transparent", borderColor: "limegreen"}} ref={setNodeRef}></div>
    }

    return (<>
            <div ref={setNodeRef} {...attributes} {...listeners} className={styles["task-container"]} style={style}>
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
                    </div>
                )}
            </div>
            <Popup>
                <div>
                    <h4>Edit Task</h4>
                    <PatchTaskForm onSubmit={onSubmit} task={task}/>
                </div>
            </Popup>
        </>
    );
};

export default TaskElement;
