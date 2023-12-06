import React from 'react';
import { useDrag } from 'react-dnd';

interface ItemProps {
    id: string;
    text: string;
    onDrop: (item: { id: string; text: string; type: string }) => void;
}

const Item: React.FC<ItemProps> = ({ id, text, onDrop }) => {
    const [, drag] = useDrag({
        type: 'ITEM',
        item: { id, text, type: 'ITEM' },
    });

    const handleDrop = () => {
        onDrop({ id, text, type: 'ITEM' });
    };

    return (
        <div ref={(node) => drag(node)} onClick={handleDrop} style={{ border: '1px solid #000', padding: '8px', marginBottom: '8px', backgroundColor: 'lightgray' }}>
            {text}
        </div>
    );
};

export default Item;
