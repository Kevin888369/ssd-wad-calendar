import EventCell from "@components/EventCell";
import { TEvent } from "@utils/types";
import { IoMdAdd } from "react-icons/io";

interface Props {
  date: number;
  events: TEvent[];
  onAddClick: (date: number) => void
}

const CalendarCell: React.FC<Props> = ({ date, events, onAddClick }) => {
  return (
    <div className="bg-gray-400 border-[0.25px] border-gray-500 border-solid text-black p-2 flex flex-col gap-2 min-h-[150px]">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{date}</p>
        <button
          className="flex items-center justify-center bg-black/30 rounded-md w-8 h-8"
          onClick={() => onAddClick(date)}
        >
          <IoMdAdd className="text-white" />
        </button>
      </div>
      {events?.map((event, index) => {
        return <EventCell key={index} event={event} backgroundColor={""} />;
      })}
    </div>
  );
};

export default CalendarCell;
