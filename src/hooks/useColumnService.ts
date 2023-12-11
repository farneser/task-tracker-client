import {useEffect, useState} from 'react';
import {ColumnView, CreateColumnDto, PatchColumnDto} from '@/services/column/column.types.ts';
import {columnService} from "@/services/column/column.service.ts";
import {ErrorMessage} from "@/models/Message.ts";

interface ColumnServiceHook {
    columns: ColumnView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    updateColumns: () => Promise<void>;
    createColumn: (column: CreateColumnDto) => Promise<void>;
    updateColumn: (id: number, column: PatchColumnDto) => Promise<void>;
    removeColumn: (columnId: number) => Promise<void>;
    setColumns: (columns: ColumnView[]) => void;
}

const useColumnService = (): ColumnServiceHook => {
    const [columns, setColumns] = useState<ColumnView[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorMessage | null>(null);

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

    return {
        columns, isLoading, error,
        updateColumns, createColumn,
        removeColumn, updateColumn,
        setColumns: setColumnsHandler
    };
}

export default useColumnService;
