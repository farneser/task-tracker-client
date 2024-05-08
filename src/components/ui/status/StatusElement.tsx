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
import TrashIcon from "@/components/ui/icons/TrashIcon.tsx";
import BarsIcon from "@/components/ui/icons/BarsIcon.tsx";
import PlusIcon from "@/components/ui/icons/PlusIcon.tsx";
import CheckIcon from "@/components/ui/icons/CheckIcon.tsx";
import TaskForm from "@/components/ui/task/form/TaskForm.tsx";
import StatusForm from "@/components/ui/status/form/StatusForm.tsx";
import {useLocalization} from "@/hooks/useLocalization.ts";

type StatusProps = {
    status: StatusView;
    deleteStatus?: () => void;
    updateStatus?: (id: number, data: PatchStatusDto) => void;
    createTask?: (dto: CreateTaskDto) => void;
    updateTask?: (id: number, data: PatchTaskDto) => void;
    deleteTask?: (id: number) => void;
    tasks: TaskLookupView[];
};

const StatusElement: FC<StatusProps> = (
    {status, tasks, updateTask, deleteTask, deleteStatus, updateStatus, createTask}
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

    const [mouseIsOver, setMouseIsOver] = useState(false);

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

    return (<>
            <CreatePopup>
                <TaskForm onSubmit={onCreateSubmit} statusId={status.id}/>
            </CreatePopup>
            <EditPopup>
                <StatusForm onSubmit={onEditSubmit} status={status}/>
            </EditPopup>
            <div className={styles.status__container} ref={setNodeRef} style={{...style, ...borderColorStyle}}
                 onMouseEnter={() => setMouseIsOver(true)}
                 onMouseLeave={() => setMouseIsOver(false)}
            >
                <div className={styles.header}>
                    {updateStatus ? <>
                        <div className={styles.header__drag}
                             {...attributes}
                             {...listeners}
                        >
                            <BarsIcon/>
                        </div>
                        <div onClick={reverseEditPopup}
                             className={styles.header__title}>
                            <div>{status.statusName}</div>
                            {status.isCompleted && <div style={{width: "30px", height: "30px"}}><CheckIcon/></div>}
                        </div>
                    </> : <div>
                        <div>{status.statusName}</div>
                        {status.isCompleted && <div style={{width: "30px", height: "30px"}}><CheckIcon/></div>}
                    </div>}
                    {deleteStatus && mouseIsOver &&
                        <button className={styles.header__delete} onClick={deleteStatus}>
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
