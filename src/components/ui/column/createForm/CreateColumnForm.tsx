import {FC} from "react";
import {useForm} from "react-hook-form";
import {CreateColumnDto} from "@/services/column/column.types.ts";

type CreateColumnFormProps = {
    onSubmit: (data: CreateColumnDto) => void;
}

const CreateColumnForm: FC<CreateColumnFormProps> = ({onSubmit}) => {
    const {register, handleSubmit, reset} = useForm<CreateColumnDto>();

    const submit = (data: CreateColumnDto) => {
        onSubmit(data)
        reset()
    }

    return <div>
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>
                    <label>
                        <span>columnName</span>
                        <input type="text"
                               placeholder="columnName" {...register("columnName", {required: true})} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>isCompleted</span>
                        <input type="checkbox"
                               placeholder="isCompleted" {...register("isCompleted", {required: true})} />
                    </label>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    </div>
}

export default CreateColumnForm;