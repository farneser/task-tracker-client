import {FC} from "react";
import useProjects from "@/hooks/useProjects.ts";
import {Link, useNavigate} from "react-router-dom";
import styles from "./SideBar.module.scss";
import usePopup from "@/hooks/usePopup.tsx";
import ProjectForm from "@/components/ui/project/form/ProjectForm.tsx";
import {PatchProjectDto} from "@/services/project/project.types.ts";

const SideBar: FC = () => {
    const {projects, createProject} = useProjects();
    const navigate = useNavigate();
    const {openPopup, closePopup, Popup} = usePopup();

    const onSubmit = async (data: PatchProjectDto) => {
        const project = await createProject(data);

        closePopup();

        navigate(`p/${project.id}`);
    };

    return (
        <div className={styles.sidebar__container}>
            <Popup>
                <ProjectForm onSubmit={onSubmit}/>
            </Popup>
            <div className={styles.sidebar__container__head}>
                <ul>
                    <li><Link to="p">Dashboard</Link></li>
                    <li><Link to="#" onClick={openPopup}>Create new Project</Link></li>
                </ul>
            </div>
            <div className={styles.sidebar__container__sepatator}/>
            <div className={styles.sidebar__container__list}>
                <ul>
                    {projects.map(p => (
                        <li key={p.id}><Link to={`p/${p.id}`}>{p.projectName}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBar;