import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import styles from "./ProjectForm.module.scss";
import {PatchProjectDto, ProjectView} from "@/services/project/project.types.ts";

type ProjectFormProps = {
    project?: ProjectView;
    onSubmit: (data: PatchProjectDto) => void;
}

const ProjectForm: FC<ProjectFormProps> = ({onSubmit, project}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setFocus
    } = useForm<PatchProjectDto>({defaultValues: project});

    useEffect(() => {
        setFocus("projectName");
    }, [setFocus]);

    const submit = (data: PatchProjectDto) => {
        onSubmit(data);
        reset();
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>{project ? "Update project" : "Create a new project"}</h1>
        </div>
        <div>
            <label className={styles.form__label}>Title</label>
            <input className={styles.form__input}
                   placeholder="Project name" {...register("projectName", {
                required: "Project name is required",
                minLength: {value: 1, message: "Project name is too short"},
                maxLength: {value: 255, message: "Project name is too long. Max length is 255 characters"}
            })}/>
            {errors.projectName && <p className={styles.form__error}>{errors.projectName.message}</p>}
        </div>
        <div>
            <button type="submit" className={styles.form__button}>
                {project ? "Update project" : "Add project"}
            </button>
        </div>
    </form>
}

export default ProjectForm;