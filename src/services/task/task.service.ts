import axiosInstance from "@/api/api.interceptor.ts";
import {CreateTaskDto, PatchTaskDto, TaskLookupView, TaskView} from "@/services/task/task.types.ts";

export const taskService = {
    async get(): Promise<TaskLookupView[]> {
        const response = await axiosInstance.get<TaskLookupView[]>("/api/v1/task");

        return response.data;
    }, async getById(id: number): Promise<TaskView> {
        const response = await axiosInstance.get<TaskView>(`/api/v1/task/${id}`);

        return response.data;
    }, async create(dto: CreateTaskDto): Promise<TaskView> {
        const response = await axiosInstance.post<TaskView>("/api/v1/task", {
            taskName: dto.taskName,
            description: dto.description,
            statusId: dto.statusId,
            assignedFor: dto.assignedUserId,
        });

        return response.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/task/${id}`);

        return null;
    }, async patch(id: number, dto: PatchTaskDto): Promise<TaskView> {
        const response = await axiosInstance.patch<TaskView>(`/api/v1/task/${id}`, {
            taskName: dto.taskName,
            description: dto.description,
            statusId: dto.statusId,
            orderNumber: dto.orderNumber,
            assignedFor: dto.assignedUserId,
        });

        return response.data;
    }, async getArchived(): Promise<TaskLookupView[]> {
        const response = await axiosInstance.patch<TaskLookupView[]>(`/api/v1/task/archived`);

        return response.data;
    }, async archive(): Promise<void> {
        await axiosInstance.put(`/api/v1/task/archive`);
    }
}
