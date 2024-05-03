export interface CreateProjectDto {
    projectName: string;
}

export interface PatchProjectDto extends CreateProjectDto {
}

export interface ProjectView extends PatchProjectDto {
    id: number;
}