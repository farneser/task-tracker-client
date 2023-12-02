import axiosInstance from "@/api/api.interceptor.ts";
import {CreateTaskDto, PatchTaskDto, TaskView} from "@/services/task/task.types.ts";

export const taskService = {
    async get(): Promise<TaskView[]> {
        const data = await axiosInstance.get<TaskView[]>("/api/v1/task");

        return data.data;
    }, async getById(id: number): Promise<TaskView> {
        const data = await axiosInstance.get<TaskView>(`/api/v1/task/${id}`);

        return data.data;
    }, async create(dto: CreateTaskDto): Promise<TaskView> {
        const data = await axiosInstance.post<TaskView>("/api/v1/task", dto);

        return data.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/task/${id}`);

        return null;
    }, async patch(id: number, dto: PatchTaskDto): Promise<TaskView> {
        const data = await axiosInstance.patch<TaskView>(`/api/v1/task/${id}`, dto);

        return data.data;
    }, async getArchived(): Promise<TaskView[]> {
        const data = await axiosInstance.patch<TaskView[]>(`/api/v1/task/archived`);

        return data.data;
    }
}
