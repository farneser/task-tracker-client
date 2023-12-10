import {FC, useMemo, useState} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {columnService} from "@/services/column/column.service.ts";
import PatchColumnForm from "@/components/ui/column/patch/PatchColumnForm.tsx";
import {CreateTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import {CSS} from "@dnd-kit/utilities";

import styles from "./ColumnElement.module.scss";
import CreateTaskForm from "@/components/ui/task/create/CreateTaskForm.tsx";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {getColumnId, getTaskId} from "@/utils/id/id.utils.ts";

type ColumnProps = {
    column: ColumnView;
    deleteColumn?: () => void;
    updateColumn?: (data: ColumnView) => void;
    createTask?: (dto: TaskLookupView) => void;
    updateTask?: (data: TaskLookupView) => void;
    deleteTask?: (id: number) => void;
    tasks: TaskLookupView[];
};

const ColumnElement: FC<ColumnProps> = (
    {
        column, tasks,
        updateTask, deleteTask,
        deleteColumn, updateColumn,
        createTask
    }
) => {
    const {reversePopup: reverseEditPopup, closePopup: closeEditPopup, Popup: EditPopup} = usePopup();
    const {reversePopup: reverseCreatePopup, closePopup: closeCreatePopup, Popup: CreatePopup} = usePopup();
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
        transform: CSS.Transform.toString(transform),
    }

    const onEditSubmit = async (data: PatchColumnDto) => {
        const dto = await columnService.patch(column.id, data);

        updateColumn && updateColumn(dto);

        closeEditPopup();
    };

    const onCreateSubmit = async (data: CreateTaskDto) => {
        const dto = await taskService.create(data);

        createTask && createTask({...dto, columnId: column.id});

        closeCreatePopup();
    };

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className={styles["column-container"]}></div>
    }

    return (
        <>
            <CreatePopup>
                <CreateTaskForm onSubmit={onCreateSubmit} columnId={column.id}/>
            </CreatePopup>
            <EditPopup>
                <PatchColumnForm onSubmit={onEditSubmit} column={column}/>
            </EditPopup>

            <div className={styles["column-container"]} ref={setNodeRef} style={style}
                 onMouseEnter={() => {
                     setMouseIsOver(true);
                 }}
                 onMouseLeave={() => {
                     setMouseIsOver(false);
                 }}>
                <div className={styles["column-header"]}
                     {...attributes}
                     {...listeners}>
                    <span onClick={reverseEditPopup}>{column.columnName}</span>
                    {deleteColumn && mouseIsOver &&
                        <button className={styles["delete-button"]} onClick={deleteColumn}>Del</button>}
                </div>

                <div className={styles["task-container"]}>
                    <SortableContext items={tasksIds}>
                        {tasks.map((task) => (
                            <div className={styles["task-element"]} key={task.id}>
                                <TaskElement
                                    task={task}
                                    updateTask={updateTask}
                                    deleteTask={() => deleteTask && deleteTask(task.id)}
                                />
                            </div>
                        ))}
                    </SortableContext>
                </div>
                <button onClick={reverseCreatePopup} className={styles.editButton}>Create New Task</button>
            </div>
        </>
    );
};
export default ColumnElement;
