import axiosInstance from "@/api/api.interceptor.ts";
import {CreateTaskDto, PatchTaskDto, TaskLookupView, TaskView} from "@/services/task/task.types.ts";

export const taskService = {
    async get(): Promise<TaskLookupView[]> {
        const data = await axiosInstance.get<TaskLookupView[]>("/api/v1/task");

        return data.data;
    }, async getById(id: number): Promise<TaskView> {
        const data = await axiosInstance.get<TaskView>(`/api/v1/task/${id}`);

        return data.data;
    }, async create(dto: CreateTaskDto): Promise<TaskView> {
        const data = await axiosInstance.post<TaskView>("/api/v1/task", {
            taskName: dto.taskName,
            description: dto.description,
            columnId: dto.columnId
        });

        return data.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/task/${id}`);

        return null;
    }, async patch(id: number, dto: PatchTaskDto): Promise<TaskView> {
        const data = await axiosInstance.patch<TaskView>(`/api/v1/task/${id}`, {
            taskName: dto.taskName,
            description: dto.description,
            columnId: dto.columnId,
            orderNumber: dto.orderNumber
        });

        return data.data;
    }, async getArchived(): Promise<TaskLookupView[]> {
        const data = await axiosInstance.patch<TaskLookupView[]>(`/api/v1/task/archived`);

        return data.data;
    }, async archive(): Promise<void> {
        await axiosInstance.put(`/api/v1/task/archive`);
    }
}
