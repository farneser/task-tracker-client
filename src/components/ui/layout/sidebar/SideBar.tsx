import {FC, useEffect} from "react";
import useProjects from "@/hooks/useProjects.ts";
import {Link, useNavigate} from "react-router-dom";
import styles from "./SideBar.module.scss";
import usePopup from "@/hooks/usePopup.tsx";
import ProjectForm from "@/components/ui/project/form/ProjectForm.tsx";
import {PatchProjectDto} from "@/services/project/project.types.ts";
import Loader from "@/components/ui/loader/Loader.tsx";
import useAuth from "@/hooks/useAuth.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";

import ProjectElement from "@/components/ui/project/element/ProjectElement.tsx";

const SideBar: FC = () => {
    const {projects, createProject, isLoading: isProjectsLoading, updateProjects, removeProject, updateProject} = useProjects();
    const {user} = useAuth();
    const navigate = useNavigate();
    const {openPopup, closePopup, Popup} = usePopup();
    const {translations} = useLocalization();

    useEffect(() => {
        updateProjects().then()
    }, [user]);

    const onSubmit = async (data: PatchProjectDto) => {
        const project = await createProject(data);

        closePopup();

        navigate(`p/${project.id}`);
    };

    const deleteProjectHandler = async (id: number) => {
        await removeProject(id);
        navigate("/p");
    }

    const patchProjectHandler = async (projectId: number, data: PatchProjectDto) => {
        await updateProject(projectId, data);
    }

    return (<div className={styles.sidebar__container}>
        <Popup>
            <ProjectForm onSubmit={onSubmit}/>
        </Popup>
        <div className={styles.sidebar__container__head}>
            <ul>
                <li><Link to="p">{translations.sideBar.dashboard}</Link></li>
                <li><Link to="#" onClick={openPopup}>{translations.sideBar.createNewProject}</Link></li>
            </ul>
        </div>
        <div className={styles.sidebar__container__sepatator}/>
        <div className={styles.sidebar__container__list}>
            {isProjectsLoading ? <Loader/> : <ul>
                {projects.sort((p1, p2) => (p1.id < p2.id) ? 0 : 1).map(p => (
                    <li key={p.id}>
                        <ProjectElement
                            project={p}
                            deleteHandler={() => deleteProjectHandler(p.id)}
                            patchHandler={(data) => patchProjectHandler(p.id, data)}
                        />
                    </li>
                ))}
            </ul>}
        </div>
    </div>);
}

export default SideBar;