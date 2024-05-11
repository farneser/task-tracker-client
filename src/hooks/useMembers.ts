import {useContext} from 'react';
import {ProjectMemberContext} from "@/components/providers/ProjectMemberProvider.tsx";

const useMembers = (projectId: number | null) => {
    const context = useContext(ProjectMemberContext);

    if (!context) {
        throw new Error('useMembers must be used within a ProjectMemberProvider');
    }

    if (projectId) {
        context.setProjectId(projectId)
    }

    return context;
}

export default useMembers;
