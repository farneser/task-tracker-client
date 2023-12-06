import {FC} from "react";
import {ColumnView, PatchColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import {columnService} from "@/services/column/column.service.ts";
import PatchColumnForm from "@/components/ui/column/patch/PatchColumnForm.tsx";

type ColumnProps = {
    column: ColumnView;
    deleteColumn?: () => void;
    updateColumn?: (data: ColumnView) => void;
}

const ColumnElement: FC<ColumnProps> = ({column, deleteColumn, updateColumn}) => {
    const {reversePopup, closePopup, Popup} = usePopup()

    const onSubmit = async (data: PatchColumnDto) => {
        if (data.columnName.trim() !== "") {
            const dto = await columnService.patch(column.id, data);

            if (updateColumn) {
                updateColumn(dto)
            }

            closePopup();
        }
    };

    return <div>
        <h1>{column.columnName}</h1>
        {updateColumn &&
            <>
                <button onClick={reversePopup}>Edit</button>

                <Popup>
                    <PatchColumnForm onSubmit={onSubmit} column={column}/>
                </Popup>
            </>
        }
        {deleteColumn &&
            <div>
                <button onClick={deleteColumn}>Delete</button>
            </div>
        }
        <div>
            <h2>data</h2>
            <ul>
                <li>{column.isCompleted ? 'Completed' : 'Not Completed'}</li>
                <li>{column.orderNumber}</li>
                <li>{column.tasks?.length}</li>
            </ul>
        </div>

        <div>
            <h2>tasks</h2>
            <ul>
                {column.tasks?.map(task => <li key={task.id}>{task.taskName}</li>)}
            </ul>
        </div>
    </div>
}

export default ColumnElement;