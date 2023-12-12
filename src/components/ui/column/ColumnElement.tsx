import {FC, useMemo, useState} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import ColumnForm from "@/components/ui/column/form/ColumnForm.tsx";
import {CreateTaskDto, PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import {CSS} from "@dnd-kit/utilities";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {getColumnId, getTaskId} from "@/utils/id/id.utils.ts";
import styles from "./ColumnElement.module.scss";
import TrashIcon from "@/components/ui/icons/TrashIcon.tsx";
import BarsIcon from "@/components/ui/icons/BarsIcon.tsx";
import TaskForm from "@/components/ui/task/form/TaskForm.tsx";
import PlusIcon from "@/components/ui/icons/PlusIcon.tsx";

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
             onMouseLeave={() => setMouseIsOver(false)}
        >
            <CreatePopup>
                <TaskForm onSubmit={onCreateSubmit} columnId={column.id}/>
            </CreatePopup>
            <EditPopup>
                <ColumnForm onSubmit={onEditSubmit} column={column}/>
            </EditPopup>
            <div className={styles.header}>
                <div className={styles.header__drag}
                     {...attributes}
                     {...listeners}
                >
                    <BarsIcon/>
                </div>
                <div onClick={reverseEditPopup} className={styles.header__title}>{column.columnName}</div>
                {deleteColumn && mouseIsOver &&
                    <button className={styles.header__delete} onClick={deleteColumn}>
                        <TrashIcon/>
                    </button>}
            </div>

            <div className={styles.tasks__container}>
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskElement
                            key={getTaskId(task.id)}
                            task={task}
                            updateTask={updateTask}
                            deleteTask={() => deleteTask && deleteTask(task.id)}
                        />
                    ))}
                </SortableContext>
            </div>
            <button onClick={reverseCreatePopup} className={styles.create__task}>
                <div>Create New Task</div>
                <div style={{width: "30px", height: "30px"}}><PlusIcon/></div>
            </button>
        </div>
    );
};

export default ColumnElement;
