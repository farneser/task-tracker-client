import axiosInstance from "@/api/api.interceptor.ts";
import {TaskView} from "@/services/task/task.types.ts";
import {
    CreateProjectDto,
    PatchProjectDto,
    PatchProjectMemberDto,
    ProjectMember,
    ProjectView
} from "@/services/project/project.types.ts";
import {StatusView} from "@/services/status/status.types.ts";
import {Message} from "@/models/Message.ts";

export const projectService = {
    async get(): Promise<ProjectView[]> {
        const response = await axiosInstance.get<ProjectView[]>("/api/v1/project");

        return response.data;
    }, async getById(id: number): Promise<ProjectView> {
        const response = await axiosInstance.get<ProjectView>(`/api/v1/project/${id}`);

        return response.data;
    }, async create(dto: CreateProjectDto): Promise<ProjectView> {
        const response = await axiosInstance.post<ProjectView>("/api/v1/project", {
            projectName: dto.projectName
        });

        return response.data;
    }, async delete(id: number): Promise<null> {
        await axiosInstance.delete(`/api/v1/project/${id}`);

        return null;
    }, async leave(id: number): Promise<null> {
        await axiosInstance.post(`/api/v1/project/${id}/members/leave`);

        return null;
    }, async patch(id: number, dto: PatchProjectDto): Promise<ProjectView> {
        const response = await axiosInstance.patch<ProjectView>(`/api/v1/project/${id}`, {
            projectName: dto.projectName
        });

        return response.data;
    }, async getTasks(id: number): Promise<TaskView[]> {
        const response = await axiosInstance.get<TaskView[]>(`/api/v1/project/${id}/tasks`);

        return response.data;
    }, async getStatuses(id: number): Promise<StatusView[]> {
        const response = await axiosInstance.get<StatusView[]>(`/api/v1/project/${id}/statuses?retrieveTasks=false`);

        return response.data;
    }, async getMembers(id: number): Promise<ProjectMember[]> {
        const response = await axiosInstance.get<ProjectMember[]>(`/api/v1/project/${id}/members`);

        return response.data;
    }, async patchMember(id: number, dto: PatchProjectMemberDto): Promise<ProjectMember> {
        const response = await axiosInstance.patch<ProjectMember>(`/api/v1/project/${id}/members`, {
            memberId: dto.memberId,
            role: dto.role
        });

        return response.data;
    }, async deleteMember(id: number, userId: number): Promise<Message> {
        const response = await axiosInstance.delete<Message>(`/api/v1/project/${id}/members/${userId}`);

        return response.data;
    }
}
