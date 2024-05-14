import {FC, useEffect, useState} from "react";
import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth.ts";
import useStatuses from "@/hooks/useStatuses.ts";
import useTasks from "@/hooks/useTasks.ts";
import usePopup from "@/hooks/usePopup.tsx";
import SettingsIcon from "@/components/ui/icons/SettingsIcon.tsx";
import UserSettingsForm from "@/components/ui/user/UserSettingsForm.tsx";
import {UserView} from "@/services/user/user.types.ts";
import Gravatar from "@/components/ui/gravatar/Gravatar.tsx";
import {useParams} from "react-router-dom";
import useMembers from "@/hooks/useMembers.ts";
import ProjectMembersForm from "@/components/ui/project/members/ProjectMembersForm.tsx";
import {useLocalization} from "@/hooks/useLocalization.ts";
import {isIdValid} from "@/utils/id/id.utils.ts";

const Header: FC = () => {

    const {projectId: projectIdParam} = useParams();
    const [projectId, setProjectId] = useState<number | null>(null);
    const {members, updateMembers, inviteToken: {token}} = useMembers(Number(projectId));
    const {translations} = useLocalization();
    const {user, logout, loading, patchUser} = useAuth();
    const {Popup: UserPopup, reversePopup: reverseUserPopup, closePopup: closeUserPopup} = usePopup(false)
    const {Popup: MembersPopup, reversePopup: reverseMembersPopup} = usePopup(false)

    const {updateStatuses, setIsArchiveOpen, isArchiveOpen, statuses} = useStatuses()
    const {updateTasks, archiveTasks} = useTasks()

    useEffect(() => {
        setProjectId(isIdValid(projectIdParam) ? Number(projectIdParam) : null)

        refresh().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, user, projectIdParam]);

    const refresh = async () => {
        await updateStatuses().then()
        await updateTasks().then()
        await updateMembers().then()
    }

    const onSettingsSubmit = (data: UserView) => {
        patchUser(data)
        closeUserPopup()
    }

    return <div className={styles.header}>
        {user && <UserPopup>
            <UserSettingsForm user={user} onSubmit={onSettingsSubmit}/>
        </UserPopup>}

        {projectId != null && <MembersPopup extended={true}>
            <ProjectMembersForm token={token} projectId={projectId}/>
        </MembersPopup>}

        <div className={styles.header__container}>
            {projectId}
            {projectId != null && <>
                <button className={styles.header__button} onClick={refresh}>{translations.header.tasks.refresh}</button>
                <button className={styles.header__button} onClick={() => archiveTasks(
                    statuses.filter(c => c.isCompleted).map(c => c.id))}>
                    {translations.header.tasks.archive}
                </button>
                <button className={styles.header__button} onClick={() => setIsArchiveOpen(!isArchiveOpen)}>
                    {isArchiveOpen ? translations.header.archive.close : translations.header.archive.open}
                </button>
                <button
                    onClick={() => reverseMembersPopup()}
                    className={styles.header__button}
                >{translations.header.members(members.list.length)}</button>
            </>}
            {user?.email && <>
                <div className={styles.header__user} onClick={reverseUserPopup}>
                    <span>{translations.header.loginAs(user.email)}</span>
                    <span className={styles.header__settings}><SettingsIcon/></span>
                </div>
                <Gravatar email={user.email} size={40} className="avatar"/>
            </>}

            <button className={styles.header__button} onClick={logout}>{translations.header.logout}</button>
        </div>
    </div>
}

export default Header;