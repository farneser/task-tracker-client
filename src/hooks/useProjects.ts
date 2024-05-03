import {useContext} from 'react';
import {ProjectContext} from "@/components/providers/ProjectProvider.tsx";

const useProjects = () => {
    const context = useContext(ProjectContext);

    if (!context) {
        throw new Error('useProjects must be used within a AuthProvider');
    }

    return context;
}

export default useProjects;
