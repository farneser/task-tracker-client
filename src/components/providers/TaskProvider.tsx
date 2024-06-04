import {createContext, FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {Message} from "@/models/Message.ts";
import {CreateTaskDto, PatchTaskDto, TaskLookupView} from "@/services/task/task.types.ts";
import {taskService} from "@/services/task/task.service.ts";
import {projectService} from "@/services/project/project.service.ts";

interface TaskSeriesHook {
    tasks: TaskLookupView[];
    isLoading: boolean;
    error: Message | null;
    createTask: (task: CreateTaskDto) => Promise<void>;
    updateTasks: () => void;
    updateTask: (id: number, data: PatchTaskDto) => Promise<void>;
    setTasks: (tasks: TaskLookupView[]) => void;
    removeTask: (taskId: number) => Promise<void>;
    archiveTasks: (statusIds: number[]) => Promise<void>;
    setProjectId: (projectId: number | null) => void;
}

export const TaskContext = createContext<TaskSeriesHook | null>(null);

export const TaskProvider: FC<PropsWithChildren> = ({children}) => {
    const [tasks, setTasks] = useState<TaskLookupView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Message | null>(null);
    const [projectId, setProjectId] = useState<number | null>(null);

    const updateTasks = useCallback(async () => {
        setIsLoading(true);
        let isRequestRelevant = true;

        try {
            const tasksData = projectId
                ? await projectService.getTasks(projectId)
                : await taskService.get();

            if (isRequestRelevant) {
                setTasks(tasksData);
                setError(null);
            }
        } catch (error) {
            if (isRequestRelevant) {
                setError({message: "ERROR", status: 1});
            }
        } finally {
            if (isRequestRelevant) {
                setIsLoading(false);
            }
        }

        return () => {
            isRequestRelevant = false;
        };
    }, [projectId]);

    useEffect(() => {
        updateTasks().then();
    }, [projectId, updateTasks]);

    const updateTask = async (id: number, data: PatchTaskDto) => {
        taskService.patch(id, data).then();

        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {...task, ...data, statusId: Number(data.statusId)};
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

        setTasks([...tasks, {...response, statusId: response.status?.id || -1}]);
    }

    const archiveTasks = async (statusIds: number[]) => {
        await taskService.archive().then();

        setTasks((tasks) => {
            return tasks.map((task) => {
                if (statusIds.includes(task.statusId)) {
                    return {...task, statusId: -1};
                }

                return task;
            })
        })
    }

    const setProjectIdHandler = (id: number | null) => {
        setProjectId(id);
    };

    return (
        <TaskContext.Provider
            value={{
                tasks, isLoading, error,
                updateTasks, setTasks: setTasksHandler, updateTask,
                removeTask, createTask, archiveTasks,
                setProjectId: setProjectIdHandler
            }}>
            {children}
        </TaskContext.Provider>
    );
};