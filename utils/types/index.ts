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
    date: string,
    event: TEvent,
}

export type TDateCell = {
    date: string,
    events: TEvent[],
}

export interface IMapper {
    [key: string]: any | undefined
}

export enum LocalStorage {
    E_LOCAL_EVENT = "e_local_event",
}

