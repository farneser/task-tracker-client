import {FC} from "react";
import {useForm} from "react-hook-form";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";

type PatchColumnFormProps = {
    column: ColumnView;
    onSubmit: (data: PatchColumnDto) => void;
}

const PatchColumnForm: FC<PatchColumnFormProps> = ({onSubmit, column}) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<PatchColumnDto>({defaultValues: column});

    const submit = (data: PatchColumnDto) => {
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
                               placeholder="columnName" {...register("columnName")} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>isCompleted</span>
                        <input type="checkbox"
                               placeholder="isCompleted" {...register("isCompleted")} />
                    </label>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    </div>
}

export default PatchColumnForm;