import {FC, useMemo, useState} from "react";
import useColumnService from "@/hooks/useColumnService.ts";
import ColumnElement from "@/components/ui/column/ColumnElement.tsx";
import {ColumnView, CreateColumnDto, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import CreateColumnForm from "@/components/ui/column/create/CreateColumnForm.tsx";

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
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {CreateTaskDto, PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import useTasksService from "@/hooks/useTasksService.ts";
import styles from "./RootPage.module.scss";
import {getColumnId, parseId} from "@/utils/id/id.utils.ts";

const RootPage: FC = () => {
    const {
        columns,
        createColumn,
        removeColumn,
        updateColumn,
        setColumns
    } = useColumnService();

    const {
        tasks,
        createTask,
        setTasks,
        updateTask,
        removeTask
    } = useTasksService()

    const {reversePopup, closePopup, Popup} = usePopup();
    const columnsId = useMemo(() => columns.map((col) => getColumnId(col.id)), [columns]);

    const [activeColumn, setActiveColumn] = useState<ColumnView | null>(null);
    const [activeTask, setActiveTask] = useState<TaskLookupView | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3
        },
    }))

    const onSubmit = async (data: CreateColumnDto) => {
        await createColumn(data)

        closePopup();
    };

    const updateColumnHandler = async (columnId: number, data: PatchColumnDto) => {
        await updateColumn(columnId, data);
    };

    const deleteColumnHandler = async (id: number) => {
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

    const onDragEnd = async (event: DragEndEvent) => {
        setActiveColumn(null);
        setActiveTask(null);

        const {active, over} = event;
        if (!over) return;

        if (active.id === over.id) return;

        const isActiveAColumn = active.data.current?.type === ItemTypes.COLUMN;
        if (!isActiveAColumn) return;

        setColumns(((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === parseId(active.id));

            const overColumnIndex = columns.findIndex((col) => col.id === parseId(over.id));

            columns[activeColumnIndex].orderNumber = overColumnIndex;

            updateColumnHandler(columns[activeColumnIndex].id, columns[activeColumnIndex]).then();

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })(columns))
    }

    const onDragOver = (event: DragOverEvent) => {
        const {active, over} = event;

        if (!over) return;

        const activeId = parseId(active.id);
        const overId = parseId(over.id);

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === ItemTypes.TASK;
        const isOverATask = over.data.current?.type === ItemTypes.TASK;

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            setTasks(((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                tasks[activeIndex].orderNumber = overIndex;

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;

                    updateTaskHandler(tasks[activeIndex].id, tasks[activeIndex]).then();

                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                updateTaskHandler(tasks[activeIndex].id, tasks[activeIndex]).then();

                return arrayMove(tasks, activeIndex, overIndex);
            })(tasks));
        }

        const isOverAColumn = over.data.current?.type === ItemTypes.COLUMN;

        if (isActiveATask && isOverAColumn) {
            setTasks(((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                tasks[activeIndex].orderNumber = tasks.filter((t) => t.columnId === overId).length;

                updateTaskHandler(tasks[activeIndex].id, tasks[activeIndex]).then();

                return arrayMove(tasks, activeIndex, activeIndex);
            })(tasks));
        }
    }

    const updateTaskHandler = async (id: number, data: PatchTaskDto) => {
        await updateTask(id, data)
    };

    const createTaskHandler = async (dto: CreateTaskDto) => {
        await createTask(dto);
    }

    const deleteTaskHandler = async (id: number) => {
        await removeTask(id);
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
                                deleteColumn={() => deleteColumnHandler(column.id).then()}
                                tasks={tasks.filter((task) => task.columnId === column.id)}
                                updateColumn={updateColumnHandler}
                                updateTask={updateTaskHandler}
                                deleteTask={deleteTaskHandler}
                                createTask={createTaskHandler}
                            />
                        ))}
                    </SortableContext>
                    <div className={styles["create-column-container"]}>
                        <button onClick={reversePopup}>Create New Column</button>
                    </div>
                </div>

                {createPortal(<DragOverlay>
                    {activeColumn && (
                        <ColumnElement
                            tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                            column={activeColumn}
                            updateColumn={updateColumnHandler}
                            deleteColumn={() => deleteColumnHandler(activeColumn.id).then()}
                            updateTask={updateTaskHandler}
                            deleteTask={deleteTaskHandler}
                            createTask={createTaskHandler}
                        />
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
