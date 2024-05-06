import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {Message} from "@/models/Message.ts";
import {CreateProjectDto, PatchProjectDto, ProjectView} from "@/services/project/project.types.ts";
import {projectService} from "@/services/project/project.service.ts";

interface ProjectServiceHook {
    projects: ProjectView[];
    isLoading: boolean;
    error: Message | null;
    updateProjects: () => Promise<void>;
    createProject: (project: CreateProjectDto) => Promise<ProjectView>;
    updateProject: (id: number, project: PatchProjectDto) => Promise<void>;
    removeProject: (projectId: number) => Promise<void>;
    setProjects: (projects: ProjectView[]) => void;
}

export const ProjectContext = createContext<ProjectServiceHook | null>(null);

export const ProjectProvider: FC<PropsWithChildren> = ({children}) => {
    const [projects, setProjects] = useState<ProjectView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Message | null>(null);

    useEffect(() => {
        updateProjects().then();
    }, []);

    const updateProjects = async () => {
        setIsLoading(true);
        projectService
            .get()
            .then((projectsData) => {
                setProjects(projectsData);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createProject = async (project: CreateProjectDto): Promise<ProjectView> => {
        const response = await projectService.create(project)

        setProjects([...projects, response]);

        return response
    }

    const removeProject = async (projectId: number) => {
        const newProjects = projects.filter((project) => project.id !== projectId);

        projectService.delete(projectId).then();

        setProjects(newProjects);
    }

    const updateProject = async (id: number, dto: PatchProjectDto) => {
        projectService.patch(id, dto).then();

        setProjects(projects.map((project) => {
            if (project.id === id) {
                return {...project, ...dto};
            }

            return project;
        }));
    }

    const setProjectsHandler = (projects: ProjectView[]) => {
        setProjects(projects);
    }

    return (
        <ProjectContext.Provider value={{
            projects, isLoading, error,
            updateProjects, createProject,
            removeProject, updateProject,
            setProjects: setProjectsHandler
        }}>
            {children}
        </ProjectContext.Provider>
    );
};