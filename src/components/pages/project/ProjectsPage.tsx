import {FC, useEffect, useState} from "react";
import {statusService} from "@/services/status/status.service.ts";
import styles from "./ProjectsPage.module.scss";
import {projectService} from "@/services/project/project.service.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";

const ProjectsPage: FC = () => {

    const [tasks, setTasks] = useState<number>(0);
    const [assignedTasks, setAssignedTasks] = useState<number>(0);
    const [members, setMembers] = useState<number>(0);

    const {translations} = useLocalization();

    useEffect(() => {
        Promise.all([
            statusService.get(true).then(data => data.filter(s => !s.isCompleted)),
            projectService.get().then(data => data.filter(p => p.role === "CREATOR"))
        ]).then(([statuses, projects]) => {
            const tasksCount = statuses.reduce((acc, s) => acc + (s.tasks?.length || 0), 0);
            const assignedTasksCount = statuses.reduce((acc, s) => acc + (s.tasks?.filter(t => t.assignedUserId != null).length || 0), 0);

            setTasks(tasksCount);
            setAssignedTasks(assignedTasksCount);

            let memberCount = 0;

            const promises = projects.map(p => projectService.getMembers(p.id).then(members => {
                memberCount += members.filter(d => d.role !== "CREATOR").length;
            }));

            Promise.all(promises).then(() => setMembers(memberCount)).catch(error => console.error("Error fetching members:", error));
        }).catch(error => console.error("Error fetching data:", error));
    }, []);

    return <div className={styles.page}
                style={{
                    justifyContent: "left",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    height: "auto"
                }}>
        <h1 className={styles.form} style={{width: "100%"}}>
            {translations.projectsPage.statistics}
        </h1>
        <div className={styles.form} style={{margin: "10px"}}>
            <div className={styles.form__label}>{translations.projectsPage.uncompletedTasks(tasks)}</div>
        </div>
        <div className={styles.form} style={{margin: "10px"}}>
            <div className={styles.form__label}>{translations.projectsPage.assignedTasks(assignedTasks)}</div>
        </div>
        <div className={styles.form} style={{margin: "10px"}}>
            <div className={styles.form__label}>{translations.projectsPage.members(members)}</div>
        </div>
    </div>
}

export default ProjectsPage;