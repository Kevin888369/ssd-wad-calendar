export type TEvent = {
    eventName: string,
    email: string,
    date: Date,
}

export type TDateCell = {
    id: string,
    date: number,
    events: TEvent[],
}

export interface IMapper {
	[key: string]: any | undefined
}