export type TEvent = {
    id: string,
    eventName: string,
    email: string,
    date: Date,
    color: string,
}

export type TFormEvent = {
    eventName: string,
    email: string,
    time: string,
}

export type TEditEvent = {
    timestamp: number,
    event: TEvent,
}

export type TDateCell = {
    timestamp: number,
    events: TEvent[],
}

export interface IMapper {
    [key: string]: any | undefined
}

export enum LocalStorage {
    E_LOCAL_EVENT = "e_local_event",
}

