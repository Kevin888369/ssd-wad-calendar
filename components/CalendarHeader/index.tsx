interface Props {
    text: string
}

const CalendarHeader: React.FC<Props> = ({ text }) => {
    return (
        <th className="bg-black text-center text-white pt-3 pb-8">
            {text}
        </th>
    )
}

export default CalendarHeader