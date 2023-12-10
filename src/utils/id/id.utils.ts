import {ItemTypes} from "@/utils/id/ItemTypes.ts";

const getTaskId = (id: number): string => {
    return `${ItemTypes.TASK}-${id}`
}

const getColumnId = (id: number): string => {
    return `${ItemTypes.COLUMN}-${id}`
}

const parseId = (id: string | number): number => {
    if (typeof id === 'number') {
        return id;
    }

    return parseInt(id.split('-')[1])
}

export {getTaskId, getColumnId, parseId};