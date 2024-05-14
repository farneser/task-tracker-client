import {TaskLookupView} from "@/services/task/task.types.ts";

export interface CreateStatusDto {
    statusName: string;
    statusColor: string;
    isCompleted: boolean;
    projectId: number;
}

export interface PatchStatusDto extends Omit<CreateStatusDto, "projectId"> {
    orderNumber: number;
}

export interface StatusView extends PatchStatusDto, CreateStatusDto {
    id: number;
    tasks: TaskLookupView[] | null;
}