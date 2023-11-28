import {ColumnView} from "@/services/column/column.types.ts";

export interface TaskView {
    id: number;
    taskName: string;
    description: string;
    orderNumber: number;
    column: ColumnView | null;
}