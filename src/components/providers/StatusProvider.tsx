import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {CreateStatusDto, PatchStatusDto, StatusView} from "@/services/status/status.types.ts";
import {Message} from "@/models/Message.ts";
import {statusService} from "@/services/status/status.service.ts";
import {projectService} from "@/services/project/project.service.ts";

interface StatusServiceHook {
    statuses: StatusView[];
    isLoading: boolean;
    error: Message | null;
    updateStatuses: () => Promise<void>;
    createStatus: (status: CreateStatusDto) => Promise<void>;
    updateStatus: (id: number, status: PatchStatusDto) => Promise<void>;
    removeStatus: (statusId: number) => Promise<void>;
    setStatuses: (statuses: StatusView[]) => void;
    isArchiveOpen: boolean;
    setIsArchiveOpen: (value: boolean) => void;
    archiveStatus: StatusView;
    setProjectId: (projectId: number | null) => void;
}

export const StatusContext = createContext<StatusServiceHook | null>(null);

export const StatusProvider: FC<PropsWithChildren> = ({children}) => {
    const [statuses, setStatuses] = useState<StatusView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Message | null>(null);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [projectId, setProjectId] = useState<number | null>();

    useEffect(() => {
        updateStatuses().then();
    }, [projectId]);

    const updateStatuses = async () => {
        setIsLoading(true);

        (projectId ? projectService.getStatuses(projectId) : statusService.get())
            .then((statusesData) => {
                setStatuses(statusesData);
                setError(null)
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createStatus = async (status: CreateStatusDto) => {
        const response = await statusService.create(status)

        setStatuses([...statuses, response]);
    }

    const removeStatus = async (statusId: number) => {
        const newStatuses = statuses.filter((status) => status.id !== statusId);

        statusService.delete(statusId).then();

        setStatuses(newStatuses);
    }

    const updateStatus = async (id: number, dto: PatchStatusDto) => {
        statusService.patch(id, {...dto, orderNumber: dto.orderNumber + 1}).then();

        setStatuses(statuses.map((status) => {
            if (status.id === id) {
                return {...status, ...dto};
            }

            return status;
        }));
    }

    const setStatusesHandler = (statuses: StatusView[]) => {
        setStatuses(statuses);
    }

    const setProjectIdHandler = (id: number | null) => {
        setProjectId(id);
    }

    const archiveStatus: StatusView = {
        id: -1,
        statusName: "Archive",
        statusColor: "#ffffff",
        projectId: -1,
        orderNumber: -1,
        isCompleted: false,
        tasks: null
    }

    return (
        <StatusContext.Provider value={{
            statuses, isLoading, error,
            updateStatuses, createStatus,
            removeStatus, updateStatus,
            setStatuses: setStatusesHandler,
            isArchiveOpen, setIsArchiveOpen,
            archiveStatus, setProjectId: setProjectIdHandler
        }}>
            {children}
        </StatusContext.Provider>
    );
};