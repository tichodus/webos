export enum MessageType {
    RUN,
    TERMINATE,
    RENDER,
    INITWINDOW,
    WITHPARAMS,
    WITHOUTPARAMS
}

export enum DomActions {
    WORKERDOM = "workerDom",
    PROCESSVALUE = "processValue"
}

export interface Message {
    type: MessageType,
    data: string,
    params?:{} | string
}
