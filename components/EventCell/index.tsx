import { TEvent } from "@utils/types";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

interface Props {
  date: string;
  event: TEvent;
  onEditClick: (date: string, event: TEvent) => void;
  onDeleteClick: (date: string, event: TEvent) => void;
}

const EventCell: React.FC<Props> = ({ date: stringDate, event, onEditClick, onDeleteClick }) => {
  const { date, email, eventName, color } = event;
  return (
    <div
      className="text-white p-2 flex flex-col gap-2 relative group"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="absolute top-0 right-0 transform opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={() => onDeleteClick(stringDate, event) } className="bg-black/50 text-white w-[32px] h-[32px] hover:bg-black/75">
          <AiTwotoneDelete className="w-full" />
        </button>
        <button onClick={() => onEditClick(stringDate, event)} className="bg-black/50 text-white w-[32px] h-[32px] hover:bg-black/75">
          <MdEdit className="w-full" />
        </button>
      </div>
      <p>{eventName}</p>
      <p>{email}</p>
      <p>
        {(typeof date === "string" ? new Date(date) : date).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }
        )}
      </p>
    </div>
  );
};

export default EventCell;
