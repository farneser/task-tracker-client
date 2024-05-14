import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import styles from "./ProjectForm.module.scss";
import {PatchProjectDto, ProjectView} from "@/services/project/project.types.ts";
import {useLocalization} from "@/hooks/useLocalization.ts";

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

    const {translations} = useLocalization();

    useEffect(() => {
        setFocus("projectName");
    }, [setFocus]);

    const submit = (data: PatchProjectDto) => {
        onSubmit(data);
        reset();
    }

    return <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <div>
            <h1>{project ? translations.projectForm.headingEdit : translations.projectForm.headingCreate}</h1>
        </div>
        <div>
            <label className={styles.form__label}>{translations.projectForm.projectName.label}</label>
            <input className={styles.form__input}
                   placeholder={translations.projectForm.projectName.placeholder} {...register("projectName", {
                required: translations.projectForm.projectName.required,
                minLength: {value: 1, message: translations.projectForm.projectName.minLength},
                maxLength: {value: 255, message: translations.projectForm.projectName.maxLength}
            })}/>
            {errors.projectName && <p className={styles.form__error}>{errors.projectName.message}</p>}
        </div>
        <div>
            <button type="submit" className={styles.form__button}>
                {project ? translations.projectForm.submitEdit : translations.projectForm.submitCreate}
            </button>
        </div>
    </form>
}

export default ProjectForm;