import {useEffect, useState} from 'react';
import {ErrorMessage} from "@/models/Message.ts";
import {PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";

interface TaskSeriesHook {
    tasks: TaskLookupView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    updateTasks: () => Promise<void>;
    updateTask: (id: number, data: PatchTaskDto) => Promise<void>;
    setTasks: (tasks: TaskLookupView[]) => void;
    removeTask: (taskId: number) => Promise<void>;
}

const useTasksService = (): TaskSeriesHook => {
    const [tasks, setTasks] = useState<TaskLookupView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

    useEffect(() => {
        updateTasks().then();
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

    const updateTask = async (id: number, data: PatchTaskDto) => {
        taskService.patch(id, data).then();
    }

    const setTasksHandler = (tasks: TaskLookupView[]) => {
        // TODO: update on server side and update on client side
        setTasks(tasks);
    }

    const removeTask = async (taskId: number) => {
        taskService.delete(taskId).then();
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    return {tasks, isLoading, error, updateTasks, setTasks: setTasksHandler, updateTask, removeTask};
};

export default useTasksService;
