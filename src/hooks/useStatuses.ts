import {useContext} from 'react';
import {StatusContext} from "@/components/providers/StatusProvider.tsx";

const useStatuses = () => {
    const context = useContext(StatusContext);

    if (!context) {
        throw new Error('useStatuses must be used within a StatusProvider');
    }

    return context;
}

export default useStatuses;
