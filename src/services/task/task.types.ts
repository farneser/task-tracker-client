import {StatusView} from "@/services/status/status.types.ts";

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
    column: StatusView | null;
    editDate: string;
    creationDate: string;
}

export interface TaskLookupView extends PatchTaskDto {
    id: number;
    editDate: string;
    creationDate: string;
}