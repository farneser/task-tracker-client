import {useEffect, useState} from 'react';
import {columnService} from "@/services/column/column.service.ts";
import {ErrorMessage} from "@/models/Message.ts";
import {TaskView} from "@/services/task/task.types.ts";

interface TaskSeriesHook {
    tasks: TaskView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    updateTasks: (id: number) => Promise<void>;
}

const useTaskService = (columnId: number): TaskSeriesHook => {
    const [tasks, setTasks] = useState<TaskView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        updateTasks().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTasks = async () => {
        setIsLoading(true);
        columnService
            .getTasks(columnId)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {tasks, isLoading, error, updateTasks};
};

export default useTaskService;
