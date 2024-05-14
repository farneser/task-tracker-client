import {useContext} from 'react';
import {StatusContext} from "@/components/providers/StatusProvider.tsx";

const useStatuses = (projectId?: number | null) => {
    const context = useContext(StatusContext);

    if (!context) {
        throw new Error('useStatuses must be used within a StatusProvider');
    }

    if (projectId != undefined) {
        context.setProjectId(projectId)
    }

    return context;
}

export default useStatuses;
