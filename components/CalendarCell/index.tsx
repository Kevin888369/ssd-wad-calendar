import EventCell from "@components/EventCell"
import { Event } from "@utils/types"

interface Props {
    date: number
    events: Event[]
}

const CalendarCell: React.FC<Props> = ({ date, events }) => {
    return (
        <td className="bg-gray-400 text-black p-2">
            <div className="flex flex-col gap-2">
                <p className="font-bold text-xl">{date}</p>
                {events?.map((event) => {
                    return <EventCell event={event} backgroundColor={""} />
                })}
            </div>
        </td>
    )
}

export default CalendarCell