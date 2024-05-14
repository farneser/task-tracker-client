import {createContext, FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {Message} from "@/models/Message.ts";
import {projectService} from "@/services/project/project.service.ts";
import {ProjectMember, ProjectMemberRole} from "@/services/project/project.types.ts";
import {ProjectInviteToken} from "@/services/project/invite/invite.types.ts";
import {inviteService} from "@/services/project/invite/invite.service.ts";
import useAuth from "@/hooks/useAuth.ts";

interface ProjectMemberServiceHook {
    members: {
        list: ProjectMember[];
        patch: (userId: number, role: ProjectMemberRole) => Promise<void>;
        delete: (userId: number) => Promise<void>;
        leave: () => Promise<void>
    };
    isLoading: boolean;
    error: Message | null;
    updateMembers: () => Promise<void>;
    setProjectId: (projectId: number | null) => void;
    inviteToken: {
        token: ProjectInviteToken | null;
        create: () => Promise<ProjectInviteToken | null>;
        delete: () => Promise<void>;
        update: () => Promise<void>;
    },
    userMember: ProjectMember | null;
}

export const ProjectMemberContext = createContext<ProjectMemberServiceHook | null>(null);

export const ProjectMemberProvider: FC<PropsWithChildren> = ({children}) => {
    const {user} = useAuth();
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [userMember, setUserMember] = useState<ProjectMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Message | null>(null);
    const [projectId, setProjectId] = useState<number | null>();
    const [token, setToken] = useState<ProjectInviteToken | null>(null);

    const updateMembers = useCallback(async () => {
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
    }, [projectId]);

    const setProjectIdHandler = (id: number | null) => {
        setProjectId(id);
        setUserMember(members.find(item => item.userId === user?.id) || null)
    }

    const updateInviteToken = useCallback(async () => {
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
    }, [projectId]);

    useEffect(() => {
        const updateMembersAndInviteToken = async () => {
            await updateMembers();
            await updateInviteToken();
        };

        updateMembersAndInviteToken().then();
    }, [projectId, updateMembers, updateInviteToken]);

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

    const patchMember = async (userId: number, role: ProjectMemberRole): Promise<void> => {
        try {
            if (projectId) {
                const response = await projectService.patchMember(projectId, {
                    memberId: userId,
                    role: role
                });

                setMembers(members.map((member) => {
                    if (member.userId === response.userId) {
                        return {...member, ...response};
                    }

                    return member;
                }));
            }
        } catch (error) {
            console.error("Error patching member:", error);
        }
    }

    const deleteMember = async (userId: number): Promise<void> => {
        try {
            if (projectId) {
                await projectService.deleteMember(projectId, userId);

                setMembers((members) => {
                    return members.filter((m) => m.userId !== userId);
                })
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    }

    const leaveProject = async (): Promise<void> => {
        try {
            if (projectId) {
                await projectService.leave(projectId);
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    }

    return (
        <ProjectMemberContext.Provider value={{
            isLoading, error,
            updateMembers,
            setProjectId: setProjectIdHandler,
            inviteToken: {
                token,
                create: createInviteToken,
                delete: deleteInviteToken,
                update: updateInviteToken,
            },
            members: {
                list: members,
                patch: patchMember,
                delete: deleteMember,
                leave: leaveProject
            },
            userMember
        }}>
            {children}
        </ProjectMemberContext.Provider>
    );
};