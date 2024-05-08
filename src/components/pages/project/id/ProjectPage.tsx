import {FC, useEffect, useMemo, useState} from "react";
import useStatuses from "@/hooks/useStatuses.ts";
import StatusElement from "@/components/ui/status/StatusElement.tsx";
import {PatchStatusDto, StatusView} from "@/services/status/status.types.ts";
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
import styles from "./ProjectPage.module.scss";
import {getStatusId, parseId} from "@/utils/id/id.utils.ts";
import StatusForm from "@/components/ui/status/form/StatusForm.tsx";
import useAuth from "@/hooks/useAuth.ts";
import PlusIcon from "@/components/ui/icons/PlusIcon.tsx";
import Loader from "@/components/ui/loader/Loader.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useLocalization} from "@/hooks/useLocalization.ts";

const ProjectPage: FC = () => {
    const auth = useAuth();
    const {translations} = useLocalization();
    const {projectId} = useParams();

    const {
        statuses,
        createStatus,
        removeStatus,
        updateStatus,
        setStatuses,
        isLoading: isStatusesLoading,
        isArchiveOpen,
        archiveStatus,
        error
    } = useStatuses(Number(projectId));

    const navigate = useNavigate();

    const {tasks, createTask, setTasks, updateTask, removeTask, isLoading: isTasksLoading} = useTasks()

    const {reversePopup, closePopup, Popup} = usePopup(isStatusesLoading || statuses.length === 0);
    const statusesIds = useMemo(() => statuses.map((status) => getStatusId(status.id)), [statuses]);

    const [activeStatus, setActiveStatus] = useState<StatusView | null>(null);
    const [activeTask, setActiveTask] = useState<TaskLookupView | null>(null);

    useEffect(() => {
        if (!isStatusesLoading && statuses.length !== 0) {
            closePopup();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatusesLoading, statuses])

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3
        },
    }))

    const onSubmit = async (data: PatchStatusDto) => {
        await createStatus({...data, projectId: Number(projectId)})

        closePopup();
    };

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === ItemTypes.STATUS) {
            setActiveStatus(event.active.data.current.status);
            return;
        }

        if (event.active.data.current?.type === ItemTypes.TASK) {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    const onDragEnd = async (event: DragEndEvent) => {
        setActiveStatus(null);
        setActiveTask(null);

        const {active, over} = event;
        if (!over) return;

        if (active.id === over.id) return;

        const isActiveAStatus = active.data.current?.type === ItemTypes.STATUS;
        if (!isActiveAStatus) return;

        setStatuses(((statuses) => {
            const activeStatusIndex = statuses.findIndex((status) => status.id === parseId(active.id));

            const overStatusIndex = statuses.findIndex((status) => status.id === parseId(over.id));

            statuses[activeStatusIndex].orderNumber = overStatusIndex;

            updateStatus(statuses[activeStatusIndex].id, statuses[activeStatusIndex]).then();

            return arrayMove(statuses, activeStatusIndex, overStatusIndex);
        })(statuses))
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

                if (tasks[activeIndex].statusId != tasks[overIndex].statusId) {
                    tasks[activeIndex].statusId = tasks[overIndex].statusId;

                    updateTask(tasks[activeIndex].id, tasks[activeIndex]).then();

                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                updateTask(tasks[activeIndex].id, tasks[activeIndex]).then();

                return arrayMove(tasks, activeIndex, overIndex);
            })(tasks));
        }

        const isOverAStatus = over.data.current?.type === ItemTypes.STATUS;

        if (isActiveATask && isOverAStatus) {
            setTasks(((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === parseId(activeId));

                tasks[activeIndex].statusId = parseId(overId);
                tasks[activeIndex].orderNumber = tasks.filter((t) => t.statusId === parseId(overId)).length;

                updateTask(tasks[activeIndex].id, tasks[activeIndex]).then();

                return arrayMove(tasks, activeIndex, activeIndex);
            })(tasks));
        }
    }

    if (isStatusesLoading || isTasksLoading || auth.loading) {
        return <Loader/>
    }

    if (error || isNaN(Number(projectId))) {
        navigate("/p")
    }

    return (
        <div className={styles["kanban-container"]}>
            <DndContext sensors={sensors}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}>

                <Popup>
                    <StatusForm onSubmit={onSubmit}/>
                </Popup>

                <div className={styles.status__container}>
                    <SortableContext items={statusesIds}>
                        {statuses.map((status) => (
                            <StatusElement
                                key={getStatusId(status.id)}
                                status={status}
                                deleteStatus={() => removeStatus(status.id).then()}
                                tasks={tasks.filter((task) => task.statusId === status.id)}
                                updateStatus={updateStatus}
                                updateTask={updateTask}
                                deleteTask={removeTask}
                                createTask={createTask}
                            />
                        ))}
                    </SortableContext>
                    {isArchiveOpen && <StatusElement
                        status={archiveStatus}
                        tasks={tasks.filter(task => task.statusId < 0)}
                        deleteTask={removeTask}
                    />}
                    <div className={styles.create__status__container}>
                        <button onClick={reversePopup}>
                            <div>{translations.projectPage.createStatus}</div>
                            <div style={{width: "30px", height: "30px"}}><PlusIcon/></div>
                        </button>
                    </div>
                </div>

                {
                    createPortal(<DragOverlay>
                        {activeStatus && (
                            <StatusElement
                                tasks={tasks.filter(task => task.statusId === activeStatus.id)}
                                status={activeStatus}
                                updateStatus={updateStatus}
                                deleteStatus={() => removeStatus(activeStatus.id).then()}
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
                    </DragOverlay>, document.body)
                }
            </DndContext>
        </div>
    );
}

export default ProjectPage;
