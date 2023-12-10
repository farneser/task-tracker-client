import {useEffect, useState} from 'react';
import {ErrorMessage} from "@/models/Message.ts";
import {TaskLookupView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";

interface TaskSeriesHook {
    tasks: TaskLookupView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    updateTasks: (id: number) => Promise<void>;
    setTasks: (tasks: TaskLookupView[]) => void;
}

const useTasksService = (): TaskSeriesHook => {
    const [tasks, setTasks] = useState<TaskLookupView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        updateTasks().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTasks = async () => {
        setIsLoading(true);
        taskService
            .get()
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

    const setTasksHandler = (tasks: TaskLookupView[]) => {
        // TODO: update on server side and update on client side
        setTasks(tasks);
    }

    return {tasks, isLoading, error, updateTasks, setTasks: setTasksHandler};
};

export default useTasksService;
