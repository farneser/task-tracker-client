import React, {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import Column from './Column';

const List: React.FC = () => {
    const getDefaultColumns = () => {
        return [
            {id: 'column-1', title: 'Column 1', items: [{id: 'item-1', text: 'Item 1'}, {id: 'item-2', text: 'Item 2'}, {id: 'item-3', text: 'Item 3'}]},
            {id: 'column-2', title: 'Column 2', items: []},
            {id: 'column-3', title: 'Column 3', items: []},
        ];
    };

    const [columns, setColumns] = useState<{
        id: string;
        title: string;
        items: {
            id: string;
            text: string
        }[]; // Specify the type for items
    }[]>(getDefaultColumns());


    const handleColumnDrop = (columnId: string, targetColumnId: string) => {
        setColumns((prevColumns) => {
            const updatedColumns = [...prevColumns];
            const sourceColumnIndex = updatedColumns.findIndex((column) => column.id === columnId);
            const targetColumnIndex = updatedColumns.findIndex((column) => column.id === targetColumnId);

            const [movedColumn] = updatedColumns.splice(sourceColumnIndex, 1);
            updatedColumns.splice(targetColumnIndex, 0, movedColumn);

            return updatedColumns;
        });
    };

    const handleItemDrop = (item: { id: string; text: string }, targetColumnId: string) => {
        setColumns((prevColumns) => {
            const updatedColumns = [...prevColumns];
            const sourceColumnIndex = updatedColumns.findIndex((column) =>
                column.items.some((i) => i.id === item.id)
            );
            const sourceColumn = updatedColumns[sourceColumnIndex];
            const targetColumnIndex = updatedColumns.findIndex((column) => column.id === targetColumnId);

            if (sourceColumn.id === targetColumnId) {
                const sourceItemIndex = sourceColumn.items.findIndex((i) => i.id === item.id);
                const updatedItems = [...sourceColumn.items];
                const [movedItem] = updatedItems.splice(sourceItemIndex, 1);
                updatedItems.splice(sourceItemIndex, 0, movedItem);
                updatedColumns[sourceColumnIndex] = { ...sourceColumn, items: updatedItems };
            } else {
                const updatedSourceItems = sourceColumn.items.filter((i) => i.id !== item.id);
                const targetColumn = updatedColumns[targetColumnIndex];
                const targetItemIndex = targetColumn.items.findIndex((i) => i.id === item.id);
                const updatedTargetItems = [...targetColumn.items];
                updatedTargetItems.splice(targetItemIndex, 0, item);

                updatedColumns[sourceColumnIndex] = { ...sourceColumn, items: updatedSourceItems };
                updatedColumns[targetColumnIndex] = { ...targetColumn, items: updatedTargetItems };
            }

            return updatedColumns;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{display: 'flex'}}>
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        items={column.items}
                        onItemDrop={handleItemDrop}
                        onColumnDrop={handleColumnDrop}
                    />

                ))}
            </div>
        </DndProvider>
    );
};

export default List;
