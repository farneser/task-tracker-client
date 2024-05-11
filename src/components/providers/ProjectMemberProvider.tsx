import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {Message} from "@/models/Message.ts";
import {projectService} from "@/services/project/project.service.ts";
import {ProjectMember} from "@/services/project/project.types.ts";
import {ProjectInviteToken} from "@/services/project/invite/invite.types.ts";
import {inviteService} from "@/services/project/invite/invite.service.ts";

interface ProjectMemberServiceHook {
    members: ProjectMember[];
    isLoading: boolean;
    error: Message | null;
    updateMembers: () => Promise<void>;
    setProjectId: (projectId: number | null) => void;
    inviteToken: {
        token: ProjectInviteToken | null;
        create: () => Promise<ProjectInviteToken | null>;
        delete: () => void;
        update: () => Promise<void>;
    }
}

export const ProjectMemberContext = createContext<ProjectMemberServiceHook | null>(null);

export const ProjectMemberProvider: FC<PropsWithChildren> = ({children}) => {
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Message | null>(null);
    const [projectId, setProjectId] = useState<number | null>();
    const [token, setToken] = useState<ProjectInviteToken | null>(null);

    useEffect(() => {
        updateMembers().then();
        updateInviteToken().then()
    }, [projectId]);

    const updateMembers = async () => {
        setIsLoading(true);
        if (projectId) {
            projectService.getMembers(projectId)
                .then((statusesData) => {
                    setMembers(statusesData);
                    setError(null)
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setMembers([])
        }
    };

    const setProjectIdHandler = (id: number | null) => {
        setProjectId(id);
    }

    const updateInviteToken = async (): Promise<void> => {
        try {
            if (projectId) {
                const response = await inviteService.get(projectId.toString());

                setToken(response);
            } else {
                setToken(null);
            }
        } catch (error) {
            setToken(null);

            console.log(error)
        }
    }

    const createInviteToken = async (): Promise<ProjectInviteToken | null> => {
        try {
            if (projectId) {
                const response = await inviteService.create(projectId.toString());

                setToken(response);

                return response;
            }
            return null;
        } catch (error) {
            console.error("Error creating invite token:", error);

            return null;
        }
    }

    const deleteInviteToken = async (): Promise<void> => {
        try {
            if (projectId) {
                await inviteService.delete(projectId.toString());

                setToken(null);
            }
        } catch (error) {
            console.error("Error deleting invite token:", error);
        }
    }

    return (
        <ProjectMemberContext.Provider value={{
            members, isLoading, error,
            updateMembers,
            setProjectId: setProjectIdHandler,
            inviteToken: {
                token,
                create: createInviteToken,
                delete: deleteInviteToken,
                update: updateInviteToken,
            }
        }}>
            {children}
        </ProjectMemberContext.Provider>
    );
};