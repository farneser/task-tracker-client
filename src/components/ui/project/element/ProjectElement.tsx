import {FC} from "react";
import SettingsIcon from "@/components/ui/icons/SettingsIcon.tsx";
import {Link, useNavigate} from "react-router-dom";
import {PatchProjectDto, ProjectView} from "@/services/project/project.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import ProjectForm from "@/components/ui/project/form/ProjectForm.tsx";
import useMembers from "@/hooks/useMembers.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";
import styles from "./ProjectElement.module.scss";

type ProjectElementProps = {
    project: ProjectView;
    deleteHandler: () => Promise<void>;
    patchHandler: (data: PatchProjectDto) => Promise<void>;
    backgroundColor?: { backgroundColor?: string };
}

const ProjectElement: FC<ProjectElementProps> = ({backgroundColor, project, deleteHandler, patchHandler}) => {
    const {openPopup, closePopup, Popup} = usePopup();
    const {members} = useMembers(project.id);
    const navigate = useNavigate();
    const {translations} = useLocalization();

    const onSubmit = async (data: PatchProjectDto) => {

        await patchHandler(data)

        closePopup();
    };

    const onDelete = async () => {
        if (project.role == "CREATOR") {
            await deleteHandler();
        } else {
            await members.leave();
            navigate("/p");
        }
    }

    return (<>
        <Popup>
            {project.role == "CREATOR" && <ProjectForm project={project} onSubmit={onSubmit}/>}
            {<div className={styles.form}>
                <button className={styles.form__button} onClick={onDelete}>
                    {project.role == "CREATOR" ?
                        translations.project.delete
                        : translations.project.leave}
                </button>
            </div>}
        </Popup>
        <Link to={`p/${project.id}`}
              style={{display: "flex", justifyContent: "space-between", alignItems: "center", ...backgroundColor}}>
            <div>{project.projectName}</div>
            <div
                style={{width: "30px"}}
                onClick={openPopup}
            ><SettingsIcon/></div>
        </Link>
    </>)
}

export default ProjectElement;