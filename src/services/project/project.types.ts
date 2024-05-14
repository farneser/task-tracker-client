export interface CreateProjectDto {
    projectName: string;
}

export interface PatchProjectDto extends CreateProjectDto {
}

export interface ProjectView extends PatchProjectDto {
    id: number;
    role: ProjectMemberRole
}

export type ProjectMemberRole = "MEMBER" | "ADMIN" | "CREATOR";

export interface PatchProjectMemberDto {
    memberId: number;
    role: ProjectMemberRole;
}

export interface ProjectMember {
    projectId: number;
    userId: number;
    username: string;
    email: string;
    role: ProjectMemberRole
}