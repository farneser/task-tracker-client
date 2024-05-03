import {useContext} from 'react';
import {ColumnContext} from "@/components/providers/ColumnProvider.tsx";

const useColumns = () => {
    const context = useContext(ColumnContext);

    if (!context) {
        throw new Error('useColumns must be used within a AuthProvider');
    }

    return context;
}

export default useColumns;
