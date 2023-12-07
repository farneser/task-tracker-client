import {FC} from "react";
import {PatchTaskDto, TaskView} from "@/services/task/task.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {taskService} from "@/services/task/task.service.ts";
import PatchTaskForm from "@/components/ui/task/patch/PatchTaskForm.tsx";

type TaskElementProps = {
    task: TaskView;
    deleteTask?: () => void;
    updateTask?: (data: TaskView) => void;
}

const TaskElement: FC<TaskElementProps> = ({task, deleteTask, updateTask}) => {
    const {reversePopup, closePopup, Popup} = usePopup()

    const onSubmit = async (data: PatchTaskDto) => {

        const dto = await taskService.patch(task.id, data);

        if (updateTask) {
            updateTask(dto)
        }

        closePopup();
    };


    return <div>
        <h3>{task.taskName}</h3>
        <p>{task.description}</p>

        {deleteTask && <button onClick={deleteTask}>Delete</button>}
        {updateTask &&
            <>
                <button onClick={reversePopup}>Edit</button>

                <Popup>
                    here is the form for editing the task
                    <PatchTaskForm onSubmit={onSubmit} task={task}/>
                </Popup>
            </>
        }
    </div>
}

export default TaskElement;