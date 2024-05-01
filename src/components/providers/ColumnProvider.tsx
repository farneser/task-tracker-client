import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {ColumnView, CreateColumnDto, PatchColumnDto} from "@/services/column/column.types.ts";
import {Message} from "@/models/Message.ts";
import {columnService} from "@/services/column/column.service.ts";

interface ColumnServiceHook {
    columns: ColumnView[];
    isLoading: boolean;
    error: Message | null;
    updateColumns: () => Promise<void>;
    createColumn: (column: CreateColumnDto) => Promise<void>;
    updateColumn: (id: number, column: PatchColumnDto) => Promise<void>;
    removeColumn: (columnId: number) => Promise<void>;
    setColumns: (columns: ColumnView[]) => void;
    isArchiveOpen: boolean;
    setIsArchiveOpen: (value: boolean) => void;
    archiveColumn: ColumnView;
}


export const ColumnContext = createContext<ColumnServiceHook | null>(null);

export const ColumnProvider: FC<PropsWithChildren> = ({children}) => {
    const [columns, setColumns] = useState<ColumnView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Message | null>(null);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    useEffect(() => {
        updateColumns().then();
    }, []);

    const updateColumns = async () => {
        setIsLoading(true);
        columnService
            .get()
            .then((columnsData) => {
                setColumns(columnsData);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const createColumn = async (column: CreateColumnDto) => {
        const response = await columnService.create(column)

        setColumns([...columns, response]);
    }

    const removeColumn = async (columnId: number) => {
        const newColumns = columns.filter((column) => column.id !== columnId);

        columnService.delete(columnId).then();

        setColumns(newColumns);
    }

    const updateColumn = async (id: number, dto: PatchColumnDto) => {
        columnService.patch(id, {...dto, orderNumber: dto.orderNumber + 1}).then();

        setColumns(columns.map((column) => {
            if (column.id === id) {
                return {...column, ...dto};
            }

            return column;
        }));
    }

    const setColumnsHandler = (columns: ColumnView[]) => {
        setColumns(columns);
    }

    const archiveColumn: ColumnView = {
        id: -1,
        columnName: "Archive",
        orderNumber: -1,
        isCompleted: false,
        tasks: null
    }


    return (
        <ColumnContext.Provider value={{
            columns, isLoading, error,
            updateColumns, createColumn,
            removeColumn, updateColumn,
            setColumns: setColumnsHandler,
            isArchiveOpen, setIsArchiveOpen,
            archiveColumn
        }}>
            {children}
        </ColumnContext.Provider>
    );
};