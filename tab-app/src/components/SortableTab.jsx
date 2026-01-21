import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Tab from './Tab.jsx';

export default function SortableTab({ tab, isActive, onClick, onDelete, onPin }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: tab.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="h-full"
        >
            <Tab
                tab={tab}
                isActive={isActive}
                onClick={onClick}
                onDelete={onDelete}
                onPin={onPin}
            />
        </div>
    );
};