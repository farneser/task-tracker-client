import {ColumnView} from "@/services/column/column.types.ts";

export interface CreateTaskDto {
    columnId: number;
    taskName: string
    description: string
}

export interface PatchTaskDto extends CreateTaskDto {
    taskName: string;
    description: string;
    columnId: number;
    orderNumber: number;
}

export interface TaskView extends Omit<PatchTaskDto, "columnId"> {
    id: number;
    column: ColumnView | null;
}

export interface TaskLookupView extends PatchTaskDto {
    id: number;
}