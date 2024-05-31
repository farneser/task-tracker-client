import {createContext, FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {isIdValid} from "@/utils/id/id.utils.ts";

interface ProjectIdContextType {
    projectId: number | null;
}

export const ProjectIdContext = createContext<ProjectIdContextType | undefined>(undefined);

export const ProjectIdProvider: FC<PropsWithChildren> = ({children}) => {
    const {projectId: projectIdParam} = useParams();

    const [projectId, setProjectIdState] = useState<number | null>(null);

    const updateProjectId = useCallback(() => {
        setProjectIdState(isIdValid(projectIdParam) ? Number(projectIdParam) : null)
    }, [projectIdParam])

    useEffect(() => {
        updateProjectId()
    }, [updateProjectId]);

    useEffect(() => {
        console.log(`project is updated to ${projectIdParam} param`)
        updateProjectId()
    }, [projectIdParam, updateProjectId]);

    return (
        <ProjectIdContext.Provider value={{
            projectId
        }}>
            {children}
        </ProjectIdContext.Provider>
    );
};