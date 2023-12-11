import {FC} from "react";
import {PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import PatchTaskForm from "@/components/ui/task/patch/PatchTaskForm.tsx";

import styles from "./TaskElement.module.scss";
import {useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {CSS} from "@dnd-kit/utilities";
import {getTaskId} from "@/utils/id/id.utils.ts";

type TaskElementProps = {
    task: TaskLookupView;
    deleteTask?: () => void;
    updateTask?: (id: number, data: PatchTaskDto) => void;
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
        id: getTaskId(task.id),
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
        updateTask && updateTask(task.id, data);

        closePopup();
    };

    if (isDragging) {
        return <div className={styles["task-container-overlay"]} style={style} ref={setNodeRef}></div>
    }

    return (<>
            <div ref={setNodeRef} {...attributes} {...listeners} className={styles["task-container"]} style={style}>
                <div className={styles["task-header"]} onClick={reversePopup}>{task.taskName}</div>
                <p className={styles["task-description"]}>{task.description}</p>
                <button onClick={deleteTask}>Delete</button>
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
