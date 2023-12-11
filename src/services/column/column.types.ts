import {TaskLookupView} from "@/services/task/task.types.ts";

export interface CreateColumnDto {
    columnName: string;
    isCompleted: boolean;
}

export interface PatchColumnDto extends CreateColumnDto {
    orderNumber: number;
}


export interface ColumnView extends PatchColumnDto {
    id: number;
    tasks: TaskLookupView[] | null;
}