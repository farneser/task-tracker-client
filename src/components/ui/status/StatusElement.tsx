import {FC, useMemo, useState} from "react";
import {PatchStatusDto, StatusView} from "@/services/status/status.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {CreateTaskDto, PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import {CSS} from "@dnd-kit/utilities";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import {ItemTypes} from "@/utils/id/ItemTypes.ts";
import {getStatusId, getTaskId} from "@/utils/id/id.utils.ts";
import styles from "./StatusElement.module.scss";
import BarsIcon from "@/components/ui/icons/BarsIcon.tsx";
import PlusIcon from "@/components/ui/icons/PlusIcon.tsx";
import CheckIcon from "@/components/ui/icons/CheckIcon.tsx";
import TaskForm from "@/components/ui/task/form/TaskForm.tsx";
import StatusForm from "@/components/ui/status/form/StatusForm.tsx";
import {useLocalization} from "@/hooks/useLocalization.ts";
import TrashIcon from "@/components/ui/icons/TrashIcon.tsx";
import useMembers from "@/hooks/useMembers.ts";
import useProjectId from "@/hooks/useProjectId.ts";
import useIsMobile from "@/hooks/is-mobile-phone-hooks.ts";
import useStatuses from "@/hooks/useStatuses.ts";

type StatusProps = {
    status: StatusView;
    deleteStatus?: () => void;
    updateStatus?: (id: number, data: PatchStatusDto) => void;
    createTask?: (dto: CreateTaskDto) => void;
    updateTask?: (id: number, data: PatchTaskDto) => void;
    deleteTask?: (id: number) => void;
    tasks: TaskLookupView[];
    draggable?: boolean;
    move?: (id: number, isLeftDirection: boolean) => void;
};

const StatusElement: FC<StatusProps> = (
    {
        status,
        tasks,
        updateTask,
        deleteTask,
        deleteStatus,
        updateStatus,
        createTask,
        draggable,
        move,
    }
) => {
    const {translations} = useLocalization();

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

    const {projectId} = useProjectId();
    const {userMember} = useMembers(projectId)
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [blockMouseIsOver, setBlockMouseIsOver] = useState(false)

    const {statuses} = useStatuses(projectId);

    const setMouseIsOverHandler = (state: boolean) => {
        if (!blockMouseIsOver) {
            setMouseIsOver(state)
        }
    }

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: getStatusId(status.id),
        data: {
            type: ItemTypes.STATUS,
            status: status,
        }
    })
    const {isMobile} = useIsMobile();

    const tasksIds = useMemo(() => {
        return tasks.map((task) => getTaskId(task.id)) || [];
    }, [tasks]);

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const borderColorStyle = {
        borderColor: ""
    }

    if (mouseIsOver) {
        borderColorStyle.borderColor = status.statusColor
    }

    const onEditSubmit = async (data: PatchStatusDto) => {
        updateStatus && updateStatus(status.id, data);

        closeEditPopup();
    };

    const onCreateSubmit = async (data: CreateTaskDto) => {
        createTask && createTask(data);

        closeCreatePopup();
    };

    if (isDragging) {
        return <div ref={setNodeRef} style={{...style, ...borderColorStyle}}
                    className={styles.status__container_overlay}></div>
    }

    const isFirst = (): boolean => {
        return statuses.findIndex(s => s.id == status.id) == 0;
    };

    const isLast = (): boolean => {
        return statuses.findIndex(s => s.id == status.id) == statuses.length - 1;
    };

    const moveStatus = (isMoveLeft: boolean) => {
        move && move(status.id, isMoveLeft);
    }

    return (<>
            <CreatePopup>
                <TaskForm onSubmit={onCreateSubmit} statusId={status.id}/>
            </CreatePopup>
            <EditPopup>
                <StatusForm onSubmit={onEditSubmit} status={status}/>
                {move && <div className={styles.form}
                              style={{display: "flex", justifyContent: "space-around", marginTop: "3%"}}>
                    {!isFirst() && <button
                        className={styles.form__button}
                        style={{left: 0}}
                        onClick={() => moveStatus(true)}
                    >
                        move left
                    </button>}
                    {!isLast() && <button
                        className={styles.form__button}
                        style={{right: 0}}
                        onClick={() => moveStatus(false)}
                    >
                        move right
                    </button>}
                </div>}
            </EditPopup>
            <div
                className={styles.status__container}
                ref={setNodeRef}
                style={{...style, ...borderColorStyle}}
                onMouseEnter={() => setMouseIsOverHandler(true)}
                onMouseLeave={() => setMouseIsOverHandler(false)}
            >
                <div className={styles.header}>
                    {updateStatus && draggable && userMember?.role != "MEMBER" &&
                        <div className={styles.header__drag}
                             {...attributes}
                             {...listeners}
                             style={{minWidth: "30px"}}
                        >
                            <BarsIcon/>
                        </div>}

                    <div onClick={() => {
                        if (userMember?.role != "MEMBER" && updateStatus) {
                            reverseEditPopup()
                        }
                    }}
                         className={styles.header__title}
                         style={{cursor: userMember?.role != "MEMBER" ? "pointer" : "auto"}}
                    >
                        <div>{status.statusName}</div>
                    </div>

                    {status.isCompleted && <div style={{width: "30px", height: "30px"}}><CheckIcon/></div>}

                    {deleteStatus && (mouseIsOver || isMobile) && userMember?.role != "MEMBER" &&
                        <button
                            className={styles.header__delete}
                            onClick={deleteStatus}
                            style={{minWidth: "30px"}}
                        >
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
                                statusColor={status.statusColor}
                                isMobile={isMobile}
                                popupIsOpenCallback={(state) => {
                                    setBlockMouseIsOver(state)
                                }}
                            />
                        ))}
                    </SortableContext>
                </div>
                {createTask && <button onClick={reverseCreatePopup} className={styles.create__task}>
                    <div>{translations.statusElement.createTask}</div>
                    <div style={{width: "30px", height: "30px"}}><PlusIcon/></div>
                </button>}
            </div>
        </>
    );
};

export default StatusElement;
