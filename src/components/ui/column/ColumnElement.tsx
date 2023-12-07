import {FC} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {columnService} from "@/services/column/column.service.ts";
import PatchColumnForm from "@/components/ui/column/patch/PatchColumnForm.tsx";
import {CreateTaskDto, TaskView} from "@/services/task/task.types.ts";
import CreateTaskForm from "@/components/ui/task/create/CreateTaskForm.tsx";
import {taskService} from "@/services/task/task.service.ts";
import TaskElement from "@/components/ui/task/TaskElement.tsx";
import useColumnService from "@/hooks/useColumnService.ts";

type ColumnProps = {
    column: ColumnView;
    deleteColumn?: () => void;
    updateColumn?: (data: ColumnView) => void;
}

const ColumnElement: FC<ColumnProps> = ({column, deleteColumn, updateColumn}) => {
    const {reversePopup: reverseEditPopup, closePopup: closeEditPopup, Popup: EditPopup} = usePopup()
    const {reversePopup: reverseCreatePopup, closePopup: closeCreatePopup, Popup: CreatePopup} = usePopup()
    const {updateTask} = useColumnService()

    const onEditSubmit = async (data: PatchColumnDto) => {
        const dto = await columnService.patch(column.id, data);

        if (updateColumn) {
            updateColumn(dto)
        }

        closeEditPopup();
    };

    const onCreateSubmit = async (data: CreateTaskDto) => {
        const dto = await taskService.create(data);

        let tasks = column.tasks || [];

        tasks = tasks.filter(task => task.id !== dto.id)

        if (updateColumn) {
            updateColumn({...column, tasks: [...tasks, dto]})
        }

        closeCreatePopup();
    };
    const updateTaskHandler = async (data: TaskView) => {
        await updateTask(data)
    }

    return <div>
        <h1>{column.columnName}</h1>

        <button onClick={reverseCreatePopup}>Create New Task</button>

        <CreatePopup>
            <CreateTaskForm onSubmit={onCreateSubmit} columnId={column.id}/>
        </CreatePopup>

        {updateColumn &&
            <>
                <button onClick={reverseEditPopup}>Edit</button>

                <EditPopup>
                    <PatchColumnForm onSubmit={onEditSubmit} column={column}/>
                </EditPopup>
            </>
        }
        {deleteColumn &&
            <div>
                <button onClick={deleteColumn}>Delete</button>
            </div>
        }
        <div>
            {column.tasks?.map(task =>
                <TaskElement
                    key={task.id}
                    task={task}
                    updateTask={updateTaskHandler}
                    deleteTask={() => {
                        taskService.delete(task.id).then(() => {
                            let tasks = column.tasks || [];

                            tasks = tasks.filter(task => task.id !== task.id)

                            if (updateColumn) {
                                updateColumn({...column, tasks})
                            }
                        })
                    }}/>)}
        </div>
    </div>
}

export default ColumnElement;