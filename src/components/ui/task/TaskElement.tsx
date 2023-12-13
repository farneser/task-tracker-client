import {FC, useState} from "react";
import {PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import TaskForm from "@/components/ui/task/form/TaskForm.tsx";

import styles from "./TaskElement.module.scss";
import {useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {CSS} from "@dnd-kit/utilities";
import {getTaskId} from "@/utils/id/id.utils.ts";
import TrashIcon from "@/components/ui/icons/TrashIcon.tsx";

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

    const formattedDate = new Date(task.editDate || task.creationDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    });

    const [mouseIsOver, setMouseIsOver] = useState(true);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const onSubmit = async (data: PatchTaskDto) => {
        updateTask && updateTask(task.id, data);

        closePopup();
    };

    if (isDragging) {
        return <div className={styles.task__container + " " + styles.task__container_overlay} style={style}
                    ref={setNodeRef}>
        </div>
    }

    return (<>
            <div ref={setNodeRef}
                 {...attributes}
                 {...listeners}
                 className={styles.task__container}
                 style={style}
                 onMouseEnter={() => setMouseIsOver(true)}
                 onMouseLeave={() => setMouseIsOver(false)}
            >
                <div className={styles.task__name} onClick={() => {
                    return updateTask && reversePopup();
                }}>
                    <div>{task.taskName}</div>
                    {mouseIsOver && deleteTask && <div>
                        <button onClick={deleteTask} className={styles.task__delete}>
                            <TrashIcon/>
                        </button>
                    </div>}
                </div>
                <div className={styles.task__description}>{task.description}</div>
                <div className={styles.task__date}>{formattedDate}</div>
            </div>
            <Popup>
                <TaskForm onSubmit={onSubmit} task={task} columnId={task.columnId}/>
            </Popup>
        </>
    );
};

export default TaskElement;
