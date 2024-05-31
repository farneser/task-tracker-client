import {FC} from "react";
import {ProjectMemberRole} from "@/services/project/project.types.ts";
import InviteLink from "@/components/ui/project/members/invite/InviteLink.tsx";
import {ProjectInviteToken} from "@/services/project/invite/invite.types.ts";
import useMembers from "@/hooks/useMembers.ts";
import ProjectMemberElement from "@/components/ui/project/members/member/ProjectMemberElement.tsx";
import styles from "./ProjectMembersForm.module.scss";

type ProjectMembersFormProps = {
    token: ProjectInviteToken | null;
    projectId: number;
    leaveHandler: () => void;
}

const ProjectMembersForm: FC<ProjectMembersFormProps> = ({token, projectId, leaveHandler}) => {
    const {
        userMember,
        members,
        inviteToken: {create: createInviteToken, delete: deleteInviteToken},
        updateMembers
    } = useMembers(projectId);

    const createInviteTokenHandler = async () => {
        await createInviteToken();
    }

    const deleteInviteTokenHandler = async () => {
        await deleteInviteToken();
    }

    const patchProjectMemberHandler = async (id: number, role: ProjectMemberRole) => {
        await members.patch(id, role);
        await updateMembers()
    }

    const deleteProjectMemberHandler = async (id: number) => {
        if (id == userMember?.userId) {
            leaveHandler()
        } else {
            await members.delete(id);
        }
    }

    return userMember ? <div>
        <InviteLink
            token={token}
            member={userMember}
            createHandler={createInviteTokenHandler}
            deleteHandler={deleteInviteTokenHandler}
        />
        <div className={styles.form}>
            {members.list.map((m) =>
                <ProjectMemberElement
                    key={m.userId}
                    member={m} user={userMember}
                    deleteHandler={() => deleteProjectMemberHandler(m.userId)}
                    patchHandler={(role) => patchProjectMemberHandler(m.userId, role)}
                />
            )}
        </div>
    </div> : <></>
}

export default ProjectMembersForm;