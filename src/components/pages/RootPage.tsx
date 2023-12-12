import {FC, useEffect, useMemo, useState} from "react";
import useColumns from "@/hooks/useColumns.ts";
import ColumnElement from "@/components/ui/column/ColumnElement.tsx";
import {ColumnView, CreateColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";

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
import {TaskLookupView} from "@/services/task/task.types.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import useTasks from "@/hooks/useTasks.ts";
import styles from "./RootPage.module.scss";
import {getColumnId, parseId} from "@/utils/id/id.utils.ts";
import ColumnForm from "@/components/ui/column/form/ColumnForm.tsx";
import useAuth from "@/hooks/useAuth.ts";

const RootPage: FC = () => {
    const auth = useAuth();
    const {columns, createColumn, removeColumn, updateColumn, setColumns, isLoading: isColumnsLoading} = useColumns();
    const {tasks, createTask, setTasks, updateTask, removeTask, isLoading: isTasksLoading} = useTasks()

    const {reversePopup, closePopup, Popup} = usePopup(isColumnsLoading || columns.length === 0);
    const columnsId = useMemo(() => columns.map((col) => getColumnId(col.id)), [columns]);

    const [activeColumn, setActiveColumn] = useState<ColumnView | null>(null);
    const [activeTask, setActiveTask] = useState<TaskLookupView | null>(null);

    useEffect(() => {
        if (!isColumnsLoading && columns.length !== 0) {
            closePopup();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isColumnsLoading, columns])

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3
        },
    }))

    const onSubmit = async (data: CreateColumnDto) => {
        await createColumn(data)

        closePopup();
    };

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

            updateColumn(columns[activeColumnIndex].id, columns[activeColumnIndex]).then();

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })(columns))
    }

    const onDragOver = (event: DragOverEvent) => {
        const {active, over} = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === ItemTypes.TASK;
        const isOverATask = over.data.current?.type === ItemTypes.TASK;

        if (!isActiveATask) return;

        if (isActiveATask && isOverATask) {
            setTasks(((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === parseId(activeId));
                const overIndex = tasks.findIndex((t) => t.id === parseId(overId));

                tasks[activeIndex].orderNumber = overIndex;

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;

                    updateTask(tasks[activeIndex].id, tasks[activeIndex]).then();

                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                updateTask(tasks[activeIndex].id, tasks[activeIndex]).then();

                return arrayMove(tasks, activeIndex, overIndex);
            })(tasks));
        }

        const isOverAColumn = over.data.current?.type === ItemTypes.COLUMN;

        if (isActiveATask && isOverAColumn) {
            setTasks(((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === parseId(activeId));

                tasks[activeIndex].columnId = parseId(overId);
                tasks[activeIndex].orderNumber = tasks.filter((t) => t.columnId === parseId(overId)).length;

                updateTask(tasks[activeIndex].id, tasks[activeIndex]).then();

                return arrayMove(tasks, activeIndex, activeIndex);
            })(tasks));
        }
    }

    // TODO: create preloader
    if (isColumnsLoading || isTasksLoading || auth.loading) {
        console.log('loading in root page')
        return <div>Loading...</div>
    }

    return (
        <div className={styles["kanban-container"]}>
            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                sensors={sensors}
            >

                <Popup>
                    <ColumnForm onSubmit={onSubmit}/>
                </Popup>

                <div className={styles["column-container"]}>
                    <SortableContext items={columnsId}>
                        {columns.map((column) => (
                            <ColumnElement
                                key={getColumnId(column.id)}
                                column={column}
                                deleteColumn={() => removeColumn(column.id).then()}
                                tasks={tasks.filter((task) => task.columnId === column.id)}
                                updateColumn={updateColumn}
                                updateTask={updateTask}
                                deleteTask={removeTask}
                                createTask={createTask}
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
                            updateColumn={updateColumn}
                            deleteColumn={() => removeColumn(activeColumn.id).then()}
                            updateTask={updateTask}
                            deleteTask={removeTask}
                            createTask={createTask}
                        />
                    )}
                    {activeTask && (
                        <TaskElement task={activeTask} updateTask={updateTask} deleteTask={() => {
                            removeTask(activeTask.id).then()
                        }}/>
                    )}
                </DragOverlay>, document.body)}
            </DndContext>
        </div>
    );
}


export default RootPage;
