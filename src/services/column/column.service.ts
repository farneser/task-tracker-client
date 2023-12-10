import axiosInstance from "@/api/api.interceptor.ts";
import {ColumnView, CreateColumnDto, PatchColumnDto} from "@/services/column/column.types.ts";
import {TaskView} from "@/services/task/task.types.ts";

export const columnService = {
    async get(): Promise<ColumnView[]> {
        const data = await axiosInstance.get<ColumnView[]>("/api/v1/column?retrieveTasks=false");

        return data.data;
    }, async getById(id: number): Promise<ColumnView> {
        const data = await axiosInstance.get<ColumnView>(`/api/v1/column/${id}`);

        return data.data;
    }, async create(dto: CreateColumnDto): Promise<ColumnView> {
        const data = await axiosInstance.post<ColumnView>("/api/v1/column", dto);

        return data.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/column/${id}`);

        return null;
    }, async patch(id: number, dto: PatchColumnDto): Promise<ColumnView> {
        const data = await axiosInstance.patch<ColumnView>(`/api/v1/column/${id}`, dto);

        return data.data;
    }, async getTasks(id: number): Promise<TaskView[]> {
        const data = await axiosInstance.get<TaskView[]>(`/api/v1/column/${id}/tasks`);

        return data.data;
    }
}
