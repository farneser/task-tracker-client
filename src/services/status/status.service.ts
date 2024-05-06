import axiosInstance from "@/api/api.interceptor.ts";
import {CreateStatusDto, PatchStatusDto, StatusView} from "@/services/status/status.types.ts";
import {TaskLookupView} from "@/services/task/task.types.ts";

export const statusService = {
    async get(): Promise<StatusView[]> {
        const response = await axiosInstance.get<StatusView[]>("/api/v1/status?retrieveTasks=false");

        return response.data;
    }, async getById(id: number): Promise<StatusView> {
        const response = await axiosInstance.get<StatusView>(`/api/v1/status/${id}`);

        return response.data;
    }, async create(dto: CreateStatusDto): Promise<StatusView> {
        const response = await axiosInstance.post<StatusView>("/api/v1/status", {
            statusName: dto.statusName,
            statusColor: dto.statusColor,
            isCompleted: dto.isCompleted,
            projectId: dto.projectId
        });

        return response.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/status/${id}`);

        return null;
    }, async patch(id: number, dto: PatchStatusDto): Promise<StatusView> {
        const response = await axiosInstance.patch<StatusView>(`/api/v1/status/${id}`, {
            statusName: dto.statusName,
            statusColor: dto.statusColor,
            isCompleted: dto.isCompleted,
            orderNumber: dto.orderNumber
        });

        return response.data;
    }, async getTasks(id: number): Promise<TaskLookupView[]> {
        const response = await axiosInstance.get<TaskLookupView[]>(`/api/v1/status/${id}/tasks`);

        return response.data;
    }
}
