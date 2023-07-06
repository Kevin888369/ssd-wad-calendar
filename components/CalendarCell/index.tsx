// import EventCell from "@components/EventCell";
import { TDateCell, TEvent } from "@utils/types";
import dynamic from "next/dynamic";
import { IoMdAdd } from "react-icons/io";

interface Props {
  date: number;
  cell?: TDateCell;
  onAddClick: (date: number) => void;
  onEditClick: (date: string, event: TEvent) => void;
  onDeleteClick: (date: string, event: TEvent) => void;
}

const EventCell = dynamic(() => import("@components/EventCell"), {
  ssr: false,
  // loading: () => <p>Loading...</p>,
});

const CalendarCell: React.FC<Props> = ({
  date,
  cell,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="bg-gray-400 border-[0.25px] border-gray-500 border-solid text-black p-2 flex flex-col gap-2 min-h-[150px]">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{date}</p>
        <button
          className="flex items-center justify-center bg-gray-800/40 rounded-md w-8 h-8 disabled:bg-gray-800/30 group"
          onClick={() => onAddClick(date)}
          disabled={
            typeof cell?.events?.length !== "undefined" &&
            cell?.events?.length >= 3
          }
        >
          <IoMdAdd className="text-white group-disabled:text-gray-800" />
        </button>
      </div>
      {cell?.events?.map((event, index) => {
        return (
          <EventCell
            date={cell.date}
            key={index}
            event={event}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        );
      })}
    </div>
  );
};

export default CalendarCell;
