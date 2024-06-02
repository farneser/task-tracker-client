import {useContext} from 'react';
import {TaskContext} from "@/components/providers/TaskProvider.tsx";

const useTasks = (projectId?: number | null) => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }

    context.setProjectId(projectId != undefined ? projectId : null)

    return context;
};

export default useTasks;
