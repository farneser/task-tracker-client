import {useContext} from 'react';
import {TaskContext} from "@/components/providers/TaskProvider.tsx";

const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};

export default useTasks;
