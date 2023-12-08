import {FC, useMemo} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {columnService} from "@/services/column/column.service.ts";
import PatchColumnForm from "@/components/ui/column/patch/PatchColumnForm.tsx";
import {CreateTaskDto, TaskView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import {CSS} from "@dnd-kit/utilities";

import styles from "./ColumnElement.module.scss";
import CreateTaskForm from "@/components/ui/task/create/CreateTaskForm.tsx";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/components/ui/ItemTypes.ts";

type ColumnProps = {
    column: ColumnView;
    deleteColumn?: () => void;
    updateColumn?: (data: ColumnView) => void;
};

const ColumnElement: FC<ColumnProps> = ({column, deleteColumn, updateColumn}) => {
    const {reversePopup: reverseEditPopup, closePopup: closeEditPopup, Popup: EditPopup} = usePopup();
    const {reversePopup: reverseCreatePopup, closePopup: closeCreatePopup, Popup: CreatePopup} = usePopup();

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: ItemTypes.COLUMN,
            column,
        }
    })

    const tasksIds = useMemo(() => {
        return column.tasks?.map((task) => task.id) || [];
    }, [column]);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const onEditSubmit = async (data: PatchColumnDto) => {
        const dto = await columnService.patch(column.id, data);

        if (updateColumn) {
            updateColumn(dto);
        }

        closeEditPopup();
    };

    const onCreateSubmit = async (data: CreateTaskDto) => {
        const dto = await taskService.create(data);

        let tasks = column.tasks || [];

        tasks = tasks.filter((task) => task.id !== dto.id);

        if (updateColumn) {
            updateColumn({...column, tasks: [...tasks, dto]});
        }

        closeCreatePopup();
    };
    const updateTaskHandler = async (data: TaskView) => {
        let tasks = column.tasks || [];

        tasks = tasks.map((task) => {
            if (task.id === data.id) {
                return data;
            }

            return task;
        });

        if (updateColumn) {
            updateColumn({...column, tasks: tasks});
        }
    };

    if (isDragging) {
        return <div ref={setNodeRef}
                    style={{
                        border: "black solid 1px",
                        width: "300px",
                        minHeight: "500px",
                        ...style
                    }}>
        </div>
    }

    return (
        <div className={styles["column-container"]} ref={setNodeRef} style={style}>
            <div className={styles["column-header"]}
                 {...attributes}
                 {...listeners}>
                {column.columnName}
            </div>

            <div className={styles["button-container"]}>
                <button onClick={reverseCreatePopup} className={styles.editButton}>Create New Task</button>

                <CreatePopup>
                    <CreateTaskForm onSubmit={onCreateSubmit} columnId={column.id}/>
                </CreatePopup>

                {updateColumn && (
                    <>
                        <button className={styles["edit-button"]} onClick={reverseEditPopup}>
                            Edit
                        </button>

                        <EditPopup>
                            <PatchColumnForm onSubmit={onEditSubmit} column={column}/>
                        </EditPopup>
                    </>
                )}
                {deleteColumn && (
                    <div className={styles["delete-button"]}>
                        <button onClick={deleteColumn}>Delete</button>
                    </div>
                )}
            </div>

            <div className={styles["task-container"]}>
                <SortableContext items={tasksIds}>
                    {column.tasks?.map((task) => (
                        <div className={styles["task-element"]} key={task.id}>
                            <TaskElement
                                task={task}
                                updateTask={updateTaskHandler}
                                deleteTask={() => {
                                    taskService.delete(task.id).then(() => {
                                        let tasks = column.tasks || [];

                                        tasks = tasks.filter((t) => t.id !== task.id);

                                        if (updateColumn) {
                                            updateColumn({...column, tasks});
                                        }
                                    });
                                }}
                            />
                        </div>
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};
export default ColumnElement;
