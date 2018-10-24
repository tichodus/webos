export enum MessageType {
    RUN,
    TERMINATE,
    RENDER,
    INITWINDOW
}

export interface Message {
    type: MessageType,
    data: string,
}
