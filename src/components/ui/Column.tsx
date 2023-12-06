import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Item from './Item';

interface ColumnProps {
    id: string;
    title: string;
    items: { id: string; text: string }[];
    onItemDrop: (item: { id: string; text: string }, targetColumnId: string) => void;
    onColumnDrop: (columnId: string, targetColumnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, items, onItemDrop, onColumnDrop }) => {
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
            console.log(item, id);
            if (item.type === 'COLUMN') {
                onColumnDrop(item.id, id);
            } else if (item.type === 'ITEM') {
                onItemDrop(item, id);
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ border: '1px solid #000', padding: '16px', width: '200px', opacity: isDragging ? 0.5 : 1 }}>
            <h3>{title}</h3>
            {items.map((item) => (
                <Item key={item.id} id={item.id} text={item.text} onDrop={(droppedItem) => onItemDrop(droppedItem, id)} />
            ))}
        </div>
    );
};

export default Column;
