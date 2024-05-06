import {ItemTypes} from "@/utils/id/ItemTypes.ts";

const getTaskId = (id: number): string => {
    return `${ItemTypes.TASK}-${id}`
}

const getStatusId = (id: number): string => {
    return `${ItemTypes.STATUS}-${id}`
}

const parseId = (id: string | number): number => {
    if (typeof id === 'number') {
        return id;
    }

    const idParts = id.split('-');

    if (idParts.length === 2) {
        return parseInt(idParts[1]);
    }

    return -1;
}

export {getTaskId, getStatusId, parseId};