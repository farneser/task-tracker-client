import {FC} from "react";
import {PatchTaskDto, TaskView} from "@/services/task/task.types.ts";
import {useForm} from "react-hook-form";

type PatchTaskFormProps = {
    task: TaskView;
    onSubmit: (data: PatchTaskDto) => void;
}

const PatchTaskForm: FC<PatchTaskFormProps> = ({onSubmit, task}) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<PatchTaskDto>({defaultValues: task});

    const submit = (data: PatchTaskDto) => {
        onSubmit(data)
        reset()
    }

    return <div>
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>
                        <span>taskName</span>
                        <input type="text"
                               placeholder="columnName" {...register("taskName")} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>description</span>
                        <input type="text"
                               placeholder="description" {...register("description")} />
                    </label>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    </div>
}

export default PatchTaskForm;