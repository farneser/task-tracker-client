import {FC} from "react";
import {ColumnView} from "@/services/column/column.types.ts";

type ColumnProps = {
    column: ColumnView
    deleteColumn: (() => void) | null
}

const Column: FC<ColumnProps> = ({column, deleteColumn}) => {

    return <div>
        {deleteColumn &&
            <div>
                <button onClick={deleteColumn}>Delete</button>
            </div>
        }
        <div>
            <ul>
                <li>{column.columnName}</li>
                <li>{column.isCompleted ? 'Completed' : 'Not Completed'}</li>
                <li>{column.orderNumber}</li>
                <li>{column.tasks?.length}</li>
            </ul>
        </div>
    </div>
}

export default Column;