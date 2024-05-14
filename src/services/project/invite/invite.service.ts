import axiosInstance from "@/api/api.interceptor.ts";
import {ProjectInviteToken} from "@/services/project/invite/invite.types.ts";
import {ProjectMember} from "@/services/project/project.types.ts";

export const inviteService = {
    async get(id: string): Promise<ProjectInviteToken> {
        const response = await axiosInstance.get<ProjectInviteToken>(`/api/v1/project/${id}/invite-token`);

        return response.data;
    }, async create(id: string): Promise<ProjectInviteToken> {
        const response = await axiosInstance.post<ProjectInviteToken>(`/api/v1/project/${id}/invite-token`);

        return response.data;
    }, async delete(id: string): Promise<null> {
        await axiosInstance.delete(`/api/v1/project/${id}/invite-token`);

        return null;
    }, async getAccept(token: string): Promise<ProjectInviteToken> {
        const response = await axiosInstance.get<ProjectInviteToken>(`/api/v1/project/accept-invite/${token}`);

        return response.data;
    }, async accept(token: string): Promise<ProjectMember> {
        const response = await axiosInstance.post<ProjectMember>(`/api/v1/project/accept-invite/${token}`);

        return response.data;
    },
}
