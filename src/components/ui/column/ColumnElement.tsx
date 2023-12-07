import {FC} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {columnService} from "@/services/column/column.service.ts";
import PatchColumnForm from "@/components/ui/column/patch/PatchColumnForm.tsx";
import {CreateTaskDto, TaskView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";

import styles from "./ColumnElement.module.scss";
import CreateTaskForm from "@/components/ui/task/create/CreateTaskForm.tsx";

type ColumnProps = {
    column: ColumnView;
    deleteColumn?: () => void;
    updateColumn?: (data: ColumnView) => void;
};

const ColumnElement: FC<ColumnProps> = ({column, deleteColumn, updateColumn}) => {
    const {reversePopup: reverseEditPopup, closePopup: closeEditPopup, Popup: EditPopup} = usePopup();
    const {reversePopup: reverseCreatePopup, closePopup: closeCreatePopup, Popup: CreatePopup} = usePopup();

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

    return (
        <div className={styles["column-container"]}>
            <div className={styles["column-header"]}>{column.columnName}</div>

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
            </div>
        </div>
    );
};
export default ColumnElement;
