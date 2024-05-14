import React, {FC, useState} from "react";
import {ProjectMember, ProjectMemberRole} from "@/services/project/project.types.ts";
import Gravatar from "@/components/ui/gravatar/Gravatar.tsx";
import styles from "./ProjectMemberElement.module.scss";
import {useLocalization} from "@/hooks/useLocalization.ts";

type ProjectMemberElementProps = {
    user: ProjectMember;
    member: ProjectMember;
    patchHandler: (role: ProjectMemberRole) => void;
    deleteHandler: () => void;
}

const ProjectMemberElement: FC<ProjectMemberElementProps> = ({member, user, deleteHandler, patchHandler}) => {
    const {translations} = useLocalization();
    const [selectedRole, setSelectedRole] = useState(member.role);

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value as ProjectMemberRole);
        patchHandler(e.target.value as ProjectMemberRole);
    };

    const handleDelete = () => {
        deleteHandler();
    }

    return <div className={styles.member__container} key={`${member.userId}-${member.projectId}`}>
        <div style={{height: "100%"}}>
            <Gravatar email={member.email} size={40}/>
        </div>
        <div style={{
            display: "flex",
            alignItems: "center",
            margin: "10px"
        }}>{member.username == user.username ? translations.members.member.you : member.username}</div>
        <select
            disabled={user.role === "MEMBER" || member.role == "CREATOR" || member.userId == user.userId}
            value={selectedRole}
            onChange={(e) => handleRoleChange(e)}
            style={{margin: "0 10px 0 auto"}}
        >
            <option value="MEMBER">{translations.members.member.role.member}</option>
            <option value="ADMIN">{translations.members.member.role.admin}</option>
            <option disabled={user.role != "CREATOR"}
                    value="CREATOR">{translations.members.member.role.creator}</option>
        </select>
        {(((user.userId == member.userId) || (member.role != "ADMIN" && member.userId != user.userId)) && member.role != "CREATOR") &&
            <button
                className={styles.form__button}
                onClick={() => handleDelete()}
            >{user.userId == member.userId ? translations.members.member.leave : translations.members.member.delete}</button>}
    </div>
}

export default ProjectMemberElement;