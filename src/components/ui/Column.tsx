import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Item from './Item';

interface ColumnProps {
    id: string;
    title: string;
    items: { id: string; text: string }[];
    onItemDrop: (draggedItem: { id: string; text: string }, sourceColumnId: string, targetColumnId: string, targetItemId: string) => void;
    onColumnDrop: (columnId: string, targetColumnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, items, onItemDrop, onColumnDrop }) => {
    let dropNode: HTMLDivElement | null = null;

    const [{ isDragging }, drag] = useDrag({
        type: 'COLUMN',
        item: { id, type: 'COLUMN' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ['ITEM', 'COLUMN'],
        drop: (item: { id: string; type: string; text: string }) => {
            if (item.type === 'COLUMN') {
                onColumnDrop(item.id, id);
            } else if (item.type === 'ITEM') {
                const targetItemId = dropNode?.dataset.itemId;
                onItemDrop(item, item.id, id, targetItemId || ""); // Pass targetItemId to onItemDrop
            }
        },
    });

    return (
        <div
            style={{
                border: '1px solid #000',
                padding: '16px',
                width: '200px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                marginRight: '10px',
                opacity: isDragging ? 0.5 : 1,
            }}
            ref={(node) => {
                drag(drop(node));
                dropNode = node;
            }}
        >
            <h3>{title}</h3>
            {items.map((item) => (
                <Item key={item.id} id={item.id} text={item.text} onDrop={(droppedItem) => onItemDrop(droppedItem, id, id, item.id)} />
            ))}
        </div>
    );
};

export default Column;
