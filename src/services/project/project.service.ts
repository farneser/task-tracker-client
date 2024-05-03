import axiosInstance from "@/api/api.interceptor.ts";
import {TaskView} from "@/services/task/task.types.ts";
import {CreateProjectDto, PatchProjectDto, ProjectView} from "@/services/project/project.types.ts";

export const projectService = {
    async get(): Promise<ProjectView[]> {
        const data = await axiosInstance.get<ProjectView[]>("/api/v1/project");

        return data.data;
    }, async getById(id: number): Promise<ProjectView> {
        const data = await axiosInstance.get<ProjectView>(`/api/v1/project/${id}`);

        return data.data;
    }, async create(dto: CreateProjectDto): Promise<ProjectView> {
        const data = await axiosInstance.post<ProjectView>("/api/v1/project", {
            projectName: dto.projectName
        });

        return data.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/project/${id}`);

        return null;
    }, async leave(id: number): Promise<null> {
        await axiosInstance.post(`/api/v1/project/${id}/members/leave`);

        return null;
    }, async patch(id: number, dto: PatchProjectDto): Promise<ProjectView> {
        const data = await axiosInstance.patch<ProjectView>(`/api/v1/project/${id}`, {
            projectName: dto.projectName
        });

        return data.data;
    }, async getTasks(id: number): Promise<TaskView[]> {
        const data = await axiosInstance.get<TaskView[]>(`/api/v1/project/${id}/tasks`);

        return data.data;
    }
}
