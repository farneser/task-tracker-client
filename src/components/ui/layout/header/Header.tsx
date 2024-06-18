import {FC, useEffect} from "react";
import styles from "./Header.module.scss";
import useAuth from "@/hooks/useAuth.ts";
import useStatuses from "@/hooks/useStatuses.ts";
import useTasks from "@/hooks/useTasks.ts";
import usePopup from "@/hooks/usePopup.tsx";
import SettingsIcon from "@/components/ui/icons/SettingsIcon.tsx";
import UserSettingsForm from "@/components/ui/user/UserSettingsForm.tsx";
import {UserView} from "@/services/user/user.types.ts";
import Gravatar from "@/components/ui/gravatar/Gravatar.tsx";
import {useNavigate} from "react-router-dom";
import useMembers from "@/hooks/useMembers.ts";
import ProjectMembersForm from "@/components/ui/project/members/ProjectMembersForm.tsx";
import {useLocalization} from "@/hooks/useLocalization.ts";
import useProjects from "@/hooks/useProjects.ts";
import useProjectId from "@/hooks/useProjectId.ts";

const Header: FC = () => {

    const {projectId} = useProjectId();
    const {members, updateMembers, inviteToken: {token}} = useMembers(Number(projectId));
    const {translations} = useLocalization();
    const {user, logout, loading, patchUser} = useAuth();
    const {Popup: UserPopup, reversePopup: reverseUserPopup, closePopup: closeUserPopup} = usePopup(false)
    const {Popup: MembersPopup, reversePopup: reverseMembersPopup} = usePopup(false)
    const navigate = useNavigate();
    const {updateStatuses, setIsArchiveOpen, isArchiveOpen, statuses} = useStatuses(projectId)
    const {updateTasks, archiveTasks} = useTasks()
    const {updateProjects} = useProjects();

    useEffect(() => {
        setIsArchiveOpen(false)
        updateMembers().then()

        return () => {
            console.log(`header cleanup ${projectId}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, projectId]);

    const refresh = async () => {
        updateStatuses()
        updateTasks()
        await updateMembers()
    }

    const onSettingsSubmit = (data: UserView) => {
        patchUser(data)
        closeUserPopup()
    }

    const leaveHandler = async () => {
        await members.leave()
        navigate("/p")
        await updateProjects()
    }

    return <div className={styles.header}>
        {user && <UserPopup>
            <UserSettingsForm user={user} onSubmit={onSettingsSubmit}/>
        </UserPopup>}

        {projectId != null && <MembersPopup extended={true}>
            <ProjectMembersForm token={token} projectId={projectId} leaveHandler={leaveHandler}/>
        </MembersPopup>}

        <div className={styles.header__container}>
            {projectId != null && <>
                <button className={styles.header__button} onClick={refresh}>{translations.header.tasks.refresh}</button>
                <button className={styles.header__button} onClick={() => archiveTasks(
                    statuses.filter(c => c.isCompleted && projectId == c.projectId).map(c => c.id))}>
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
            {user?.email && <div style={{display: "flex", margin: "auto 0 auto auto"}}>
                <div className={styles.header__user} onClick={reverseUserPopup} style={{marginRight: "5px"}}>
                    <span>{translations.header.loginAs(user.email)}</span>
                    <span className={styles.header__settings}><SettingsIcon/></span>
                </div>
                <Gravatar email={user.email} size={40} className="avatar"/>
            </div>}

            <button className={styles.header__button} onClick={logout}>{translations.header.logout}</button>
        </div>
    </div>
}

export default Header;