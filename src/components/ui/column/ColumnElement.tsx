import {FC, useMemo, useState} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import PatchColumnForm from "@/components/ui/column/patch/PatchColumnForm.tsx";
import {CreateTaskDto, PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import {CSS} from "@dnd-kit/utilities";
import CreateTaskForm from "@/components/ui/task/create/CreateTaskForm.tsx";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {getColumnId, getTaskId} from "@/utils/id/id.utils.ts";
import styles from "./ColumnElement.module.scss";
import BarsIcon from "@/components/ui/icons/BarsIcon.tsx";
import TrashIcon from "@/components/ui/icons/TrashIcon.tsx";

type ColumnProps = {
    column: ColumnView;
    deleteColumn: () => void;
    updateColumn: (id: number, data: PatchColumnDto) => void;
    createTask: (dto: CreateTaskDto) => void;
    updateTask: (id: number, data: PatchTaskDto) => void;
    deleteTask: (id: number) => void;
    tasks: TaskLookupView[];
};

const ColumnElement: FC<ColumnProps> = (
    {column, tasks, updateTask, deleteTask, deleteColumn, updateColumn, createTask}
) => {
    const {
        reversePopup: reverseEditPopup,
        closePopup: closeEditPopup,
        Popup: EditPopup
    } = usePopup();
    const {
        reversePopup: reverseCreatePopup,
        closePopup: closeCreatePopup,
        Popup: CreatePopup
    } = usePopup();
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: getColumnId(column.id),
        data: {
            type: ItemTypes.COLUMN,
            column,
        }
    })

    const tasksIds = useMemo(() => {
        return tasks.map((task) => getTaskId(task.id)) || [];
    }, [tasks]);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const onEditSubmit = async (data: PatchColumnDto) => {
        updateColumn && updateColumn(column.id, data);

        closeEditPopup();
    };

    const onCreateSubmit = async (data: CreateTaskDto) => {
        createTask && createTask(data);

        closeCreatePopup();
    };

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className={styles.column__container_overlay}></div>
    }

    return (
        <div className={styles.column__container} ref={setNodeRef} style={style}
             onMouseEnter={() => setMouseIsOver(true)}
             // onMouseLeave={() => setMouseIsOver(false)}
        >
            <CreatePopup>
                <CreateTaskForm onSubmit={onCreateSubmit} columnId={column.id}/>
            </CreatePopup>
            <EditPopup>
                <PatchColumnForm onSubmit={onEditSubmit} column={column}/>
            </EditPopup>
            <div className={styles['column-header']}>
                <div className={styles['column-header__drag-icon']}
                     {...attributes}
                     {...listeners}
                >
                    <BarsIcon/>
                </div>
                <div className={styles['column-header__column-name']}
                     onClick={reverseEditPopup}>{column.columnName}</div>
                {deleteColumn && mouseIsOver &&
                    <button className={styles['column-header__delete-button']} onClick={deleteColumn}>
                        <TrashIcon/>
                    </button>}
            </div>

            <div className={styles['task-container']}>
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskElement
                            task={task}
                            updateTask={updateTask}
                            deleteTask={() => deleteTask && deleteTask(task.id)}
                        />
                    ))}
                </SortableContext>
            </div>
            <button onClick={reverseCreatePopup} className={styles['edit-button']}>Create New Task</button>
        </div>
    );
};

export default ColumnElement;
