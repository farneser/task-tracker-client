import {TaskView} from "@/services/task/task.types.ts";

export interface ColumnView {
    id: number;
    columnName: string;
    isCompleted: boolean;
    orderNumber: number;
    tasks: TaskView[] | null;
}