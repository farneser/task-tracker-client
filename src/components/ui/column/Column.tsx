import {FC} from "react";
import {ColumnView} from "@/services/column/column.types.ts";

type ColumnProps = {
    column: ColumnView
}

const Column: FC<ColumnProps> = ({column}) => {
    

    return <ul>
        <li>{column.columnName}</li>
        <li>{column.isCompleted ? 'Completed' : 'Not Completed'}</li>
        <li>{column.orderNumber}</li>
        <li>{column.tasks?.length}</li>
    </ul>
}

export default Column;