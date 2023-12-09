import {FC, useMemo, useState} from "react";
import useColumnService from "@/hooks/useColumnService.ts";
import ColumnElement from "@/components/ui/column/ColumnElement.tsx";
import {columnService} from "@/services/column/column.service.ts";
import {ColumnView, CreateColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import CreateColumnForm from "@/components/ui/column/create/CreateColumnForm.tsx";

import styles from "./RootPage.module.scss";

import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {createPortal} from "react-dom";
import {ItemTypes} from "@/components/ui/ItemTypes.ts";
import {TaskView} from "@/services/task/task.types.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";

const RootPage: FC = () => {
    const {addColumn, columns, removeColumn, updateColumn, setColumns} = useColumnService();
    const {reversePopup, closePopup, Popup} = usePopup();
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<ColumnView | null>(null);
    const [activeTask, setActiveTask] = useState<TaskView | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3
        },
    }))

    const onSubmit = (data: CreateColumnDto) => {
        if (data.columnName.trim() !== "") {
            columnService.create(data).then((data) => addColumn(data));

            closePopup();
        }
    };

    const updateColumnHandler = async (data: ColumnView) => {
        await updateColumn(data);
    };

    const deleteColumnHandler = async (id: number) => {
        await columnService.delete(id);
        await removeColumn(id);
    }

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === ItemTypes.COLUMN) {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === ItemTypes.TASK) {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    const onDragEnd = (event: DragEndEvent) => {
        setActiveColumn(null);
        setActiveTask(null);

        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === ItemTypes.COLUMN;
        if (!isActiveAColumn) return;

        setColumns(((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === active.id);

            const overColumnIndex = columns.findIndex((col) => col.id === over.id);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })(columns))

    }

    const onDragOver = (event: DragOverEvent) => {
        console.log("DRAG OVER")
        const {active, over} = event;
        if (!over) return;

        const isActiveTask = active.data.current?.type === ItemTypes.TASK;
        const isOverTask = over.data.current?.type === ItemTypes.TASK;

        if (!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            console.log("DRAG OVER TASK task id " + active.data.current?.task?.id + " over task id " + over.data.current?.task?.id)

            setColumns(((columns) => {
                const activeTaskColumn = columns.find((col) => col.tasks?.find((task) => task.id === activeTask?.id));
                const overTaskColumn = columns.find((col) => col.tasks?.find((task) => task.id === over.data.current?.task?.id));

                if (activeTaskColumn) {

                    if (activeTaskColumn?.id == overTaskColumn?.id) {
                        console.log("SAME COLUMN")
                        const activeTaskIndex = activeTaskColumn?.tasks?.findIndex((task) => task.id === activeTask?.id) || 0;
                        const overTaskIndex = overTaskColumn?.tasks?.findIndex((task) => task.id === over.data.current?.task?.id) || 0;
                        const taskList = arrayMove(activeTaskColumn?.tasks || [], activeTaskIndex, overTaskIndex);

                        return columns.map((col) => {
                            if (col.id === activeTaskColumn?.id) {
                                return {...col, tasks: taskList}
                            }

                            return col;
                        });
                    }

                    if (overTaskColumn && activeTask) {
                        console.log("DIFFERENT COLUMN " + overTaskColumn?.id + " over task id " + over.data.current?.task?.id)

                        const activeColumnTask = activeTaskColumn.tasks?.filter((task) => task.id !== activeTask?.id) || [];
                        const overTaskIndex = overTaskColumn.tasks?.findIndex((task) => task.id === over.data.current?.task?.id) || 0;

                        let overColumnTasks: TaskView[] = [...overTaskColumn.tasks || [], activeTask]

                        if (overColumnTasks.length > 1) {
                            overColumnTasks = arrayMove(overColumnTasks, overTaskIndex, overTaskIndex + 1);
                        }

                        return columns.map((col) => {
                            if (col.id === activeTaskColumn.id) {
                                return {...activeTaskColumn, tasks: activeColumnTask};
                            }

                            if (col.id === overTaskColumn.id) {
                                return {...overTaskColumn, tasks: overColumnTasks};
                            }

                            return col;
                        });
                    }
                }

                return columns
            })(columns));
        }

        const isOverColumn = over.data.current?.type === ItemTypes.COLUMN;

        if (isOverColumn) {
            const taskColumn = columns.find((col) => col.tasks?.find((task) => task.id === activeTask?.id));
            const overColumn = columns.find((col) => col.id === over.id);

            if (overColumn?.id == taskColumn?.id) {
                return;
            }

            if (taskColumn && overColumn) {
                setColumns(((columns) => {

                    taskColumn.tasks = taskColumn.tasks?.filter((task) => task.id !== activeTask?.id) || [];

                    if (activeTask && overColumn.tasks) {
                        overColumn.tasks = [...overColumn.tasks, activeTask];
                    }

                    return columns.map((col) => {
                        if (col.id === taskColumn.id) {
                            return taskColumn;
                        }

                        if (col.id === overColumn.id) {
                            return overColumn;
                        }

                        return col;
                    });
                })(columns))
            }
        }
    };

    const updateTaskHandler = async () => {
        const column = columns.find((col) => col.tasks?.find((task) => task.id === activeTask?.id));

        if (column) {
            await updateColumnHandler({
                ...column,
                tasks: column.tasks?.map((task) => task.id === activeTask?.id ? activeTask : task) || []
            });
        }
    };

    const deleteTaskHandler = async (id: number) => {
        const column = columns.find((col) => col.tasks?.find((task) => task.id === id));

        if (column) {
            await updateColumnHandler({
                ...column,
                tasks: column.tasks?.filter((task) => task.id !== id) || []
            });
        }
    };


    return (
        <div className={styles["kanban-container"]}>
            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                sensors={sensors}
            >

                <Popup>
                    <CreateColumnForm onSubmit={onSubmit}/>
                </Popup>

                <div className={styles["column-container"]}>
                    <SortableContext items={columnsId}>
                        {columns.map((column) => (
                            <ColumnElement
                                key={column.id}
                                column={column}
                                deleteColumn={() => {
                                    deleteColumnHandler(column.id).then()
                                }}
                                updateColumn={updateColumnHandler}
                            />
                        ))}
                    </SortableContext>
                    <div className={styles["create-column-container"]}>
                        <button onClick={reversePopup}>Create New Column</button>
                    </div>
                </div>

                {createPortal(<DragOverlay>
                    {activeColumn && (
                        <ColumnElement column={activeColumn} updateColumn={updateColumnHandler} deleteColumn={() => {
                            deleteColumnHandler(activeColumn.id).then()
                        }}/>
                    )}
                    {activeTask && (
                        <TaskElement task={activeTask} updateTask={updateTaskHandler} deleteTask={() => {
                            deleteTaskHandler(activeTask.id).then()
                        }}/>
                    )}
                </DragOverlay>, document.body)}

            </DndContext>
        </div>
    );
}


export default RootPage;
