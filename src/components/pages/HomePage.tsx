import {FC} from "react";
import useColumnService from "@/hooks/useColumnService.ts";
import Column from "@/components/ui/column/Column.tsx";
import {columnService} from "@/services/column/column.service.ts";
import {useForm} from "react-hook-form";
import {CreateColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";

const HomePage: FC = () => {
    const {addColumn, columns} = useColumnService()
    const {register, handleSubmit, reset} = useForm<CreateColumnDto>();
    const {reversePopup, closePopup, Popup} = usePopup()

    const onSubmit = (data: CreateColumnDto) => {
        if (data.columnName.trim() !== "") {
            columnService.create(data).then(data =>
                addColumn(data)
            )

            reset()

            closePopup();
        }
    };


    return <div>
        <div>
            <h1>controls</h1>
            <button onClick={reversePopup}>Create New Column</button>

            <Popup>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
            </Popup>
        </div>
        <div>
            <h1>columns</h1>
            {columns.map(column => <Column column={column} key={column.id}/>)}
        </div>
    </div>

};

export default HomePage;