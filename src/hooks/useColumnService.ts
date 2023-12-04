import {useEffect, useState} from 'react';
import {ColumnView} from '@/services/column/column.types.ts';
import {columnService} from "@/services/column/column.service.ts";
import {ErrorMessage} from "@/models/errorMessage.ts";

interface ColumnServiceHook {
    columns: ColumnView[];
    isLoading: boolean;
    error: ErrorMessage | null;
    updateColumns: () => Promise<void>;
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

    return {columns, isLoading, error, updateColumns};
};

export default useColumnService;
