import {StatusView} from "@/services/status/status.types.ts";

export interface CreateTaskDto {
    statusId: number;
    taskName: string;
    description: string;
    assignedFor?: number;
}

export interface PatchTaskDto extends CreateTaskDto {
    taskName: string;
    description: string;
    statusId: number;
    orderNumber: number;
}

export interface TaskView extends Omit<PatchTaskDto, "statusId"> {
    id: number;
    status: StatusView | null;
    editDate: string;
    creationDate: string;
}

export interface TaskLookupView extends PatchTaskDto {
    id: number;
    editDate: string;
    creationDate: string;
}