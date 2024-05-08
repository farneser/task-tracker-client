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
import {useLocalization} from "@/hooks/useLocalization.ts";

type TaskElementProps = {
    task: TaskLookupView;
    deleteTask?: () => void;
    updateTask?: (id: number, data: PatchTaskDto) => void;
    statusColor?: string;
};

const TaskElement: FC<TaskElementProps> = ({task, deleteTask, updateTask, statusColor}) => {
    const {reversePopup, closePopup, Popup} = usePopup();

    const {locale} = useLocalization();

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
        }
    })

    const formattedDate = new Date(task.editDate || task.creationDate).toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    });

    const [mouseIsOver, setMouseIsOver] = useState(false);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const onSubmit = async (data: PatchTaskDto) => {
        updateTask && updateTask(task.id, data);

        closePopup();
    };

    const borderColorStyle = {
        borderColor: ""
    }

    if (mouseIsOver && statusColor) {
        borderColorStyle.borderColor = statusColor
    }

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
                 style={{...style, ...borderColorStyle}}
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
                <TaskForm onSubmit={onSubmit} task={task} statusId={task.statusId}/>
            </Popup>
        </>
    );
};

export default TaskElement;
