import {useContext} from 'react';
import {StatusContext} from "@/components/providers/StatusProvider.tsx";

const useStatuses = (projectId?: number | null) => {
    const context = useContext(StatusContext);

    if (!context) {
        throw new Error('useStatuses must be used within a StatusProvider');
    }

    context.setProjectId(projectId != undefined ? projectId : null)

    return context;
}

export default useStatuses;
