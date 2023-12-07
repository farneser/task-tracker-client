export interface Message {
    message: string;
}

export interface ErrorMessage extends Message {
    status: number;
}