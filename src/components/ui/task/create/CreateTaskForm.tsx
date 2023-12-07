import {FC} from "react";
import {CreateTaskDto} from "@/services/task/task.types.ts";
import {useForm} from "react-hook-form";

type CreateTaskFormProps = {
    columnId: number;
    onSubmit: (data: CreateTaskDto) => void;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({onSubmit, columnId}) => {
    const {register, handleSubmit, reset} = useForm<CreateTaskDto>();

    const submit = (data: CreateTaskDto) => {
        onSubmit({...data, columnId})
        reset()
    }

    return <div>
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>
                        <span>taskName</span>
                        <input type="text"
                               placeholder="taskName" {...register("taskName", {required: true})} />
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

export default CreateTaskForm;