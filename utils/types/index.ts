export type TEvent = {
    eventName: string,
    email: string,
    date: Date,
}

export type TFormAddEvent = {
    eventName: string,
    email: string,
    time: string,
}

export type TDateCell = {
    id: string,
    date: number,
    events: TEvent[],
}

export interface IMapper {
	[key: string]: any | undefined
}

export enum LocalStorageEnum {
    ELocalEvent,
}  