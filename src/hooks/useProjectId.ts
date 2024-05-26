import {useContext} from 'react';
import {ProjectIdContext} from "@/components/providers/ProjectIdProvider.tsx";

const useProjectId = () => {
    const context = useContext(ProjectIdContext);

    if (!context) {
        throw new Error('useProjectId must be used within a ProjectIdProvider');
    }

    return context;
}

export default useProjectId;
