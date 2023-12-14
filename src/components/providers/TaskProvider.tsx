import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {ErrorMessage} from "@/models/Message.ts";
import {CreateTaskDto, PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";

interface TaskSeriesHook {
    tasks: TaskLookupView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    createTask: (task: CreateTaskDto) => Promise<void>;
    updateTasks: () => Promise<void>;
    updateTask: (id: number, data: PatchTaskDto) => Promise<void>;
    setTasks: (tasks: TaskLookupView[]) => void;
    removeTask: (taskId: number) => Promise<void>;
    archiveTasks: (columnIds: number[]) => Promise<void>;
}


export const TaskContext = createContext<TaskSeriesHook | null>(null);

export const TaskProvider: FC<PropsWithChildren> = ({children}) => {
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

        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {...task, ...data};
            }
            return task;
        }));
    }

    const setTasksHandler = (tasks: TaskLookupView[]) => {
        setTasks(tasks);
    }

    const removeTask = async (taskId: number) => {
        taskService.delete(taskId).then();
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    const createTask = async (task: CreateTaskDto) => {
        const response = await taskService.create(task);

        setTasks([...tasks, {...response, columnId: response.column?.id || -1}]);
    }

    const archiveTasks = async (columnIds: number[]) => {
        await taskService.archive().then();

        setTasks((tasks) => {
            return tasks.map((task) => {
                if (columnIds.includes(task.columnId)) {
                    return {...task, columnId: -1};
                }

                return task;
            })
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasks, isLoading, error,
                updateTasks, setTasks: setTasksHandler, updateTask,
                removeTask, createTask, archiveTasks
            }}>
            {children}
        </TaskContext.Provider>
    );
};