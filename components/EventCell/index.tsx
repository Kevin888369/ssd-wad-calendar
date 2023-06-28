import { TEvent } from "@utils/types";

interface Props {
  event: TEvent;
  backgroundColor: string;
}

const EventCell: React.FC<Props> = ({ event, backgroundColor }) => {
  const { date, email, eventName } = event;
  return (
    <div className="text-white p-2 flex flex-col gap-2 bg-black">
      <p>{eventName}</p>
      <p>{email}</p>
      <p>
        {date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
    </div>
  );
};

export default EventCell;
