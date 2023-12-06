import {useEffect, useState} from 'react';
import {ColumnView} from '@/services/column/column.types.ts';
import {columnService} from "@/services/column/column.service.ts";
import {ErrorMessage} from "@/models/Message.ts";

interface ColumnServiceHook {
    columns: ColumnView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    updateColumns: () => Promise<void>;
    addColumn: (column: ColumnView) => Promise<void>;
    updateColumn: (column: ColumnView) => Promise<void>;
    removeColumn: (columnId: number) => Promise<void>;
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

    const addColumn = async (column: ColumnView) => {
        setColumns([...columns, column]);
    }

    const removeColumn = async (columnId: number) => {
        const newColumns = columns.filter((column) => column.id !== columnId);
        setColumns(newColumns);
    }

    const updateColumn = async (column: ColumnView) => {
        const newColumns = columns.map((col) => {
            if (col.id === column.id) {
                return column;
            }

            return col;
        })

        setColumns(newColumns);
    }

    return {
        columns, isLoading, error, updateColumns, addColumn, removeColumn, updateColumn
    };
}

export default useColumnService;
