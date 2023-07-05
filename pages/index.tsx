import AddModal from "@components/AddModal";
import CalendarCell from "@components/CalendarCell";
import CalendarEmptyCell from "@components/CalendarEmptyCell";
import { getAllLocalEvent, setAllLocalEvent } from "@utils/helper";
import { TDateCell, TEditEvent, TEvent } from "@utils/types";
import type { NextPage } from "next";
import { useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import EditModal from "@components/EditModal";

const Home: NextPage = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [addDate, setAddDate] = useState(-1);
  const [editEvent, setEditEvent] = useState<TEditEvent | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [allEvent, setAllEvent] = useState<TDateCell[]>(getAllLocalEvent());
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const topGap = weekDays.findIndex(
    (weekDay) =>
      weekDay ===
      firstDayOfMonth.toLocaleDateString("en-US", { weekday: "long" })
  );
  const bottomGap = (lastDayOfMonth.getDate() + topGap) % 7;
  const datesArray = Array.from(
    { length: lastDayOfMonth.getDate() - 1 },
    (_, index) => {
      return new Date(today.getFullYear(), today.getMonth(), index + 1);
    }
  );

  const onAddSubmit = (timestamp: number, event: TEvent) => {
    const events = allEvent;
    const eventIndex = events.findIndex(
      (event) => event.timestamp === timestamp
    );
    if (eventIndex !== -1) {
      events[eventIndex].events.push(event);
    } else {
      events.push({
        timestamp: timestamp,
        events: [event],
      });
    }
    setAllLocalEvent(events);
    setAllEvent(events);
  };

  const onEditSubmit = (timestamp: number, event: TEvent) => {
    const events = allEvent;
    const dateCell = events.find((event) => event.timestamp === timestamp);
    const eventIndex = dateCell?.events.findIndex((mEvent) => mEvent.id === event.id );
    console.log(dateCell, eventIndex, 123)
    if (dateCell && eventIndex && eventIndex !== -1) {
      dateCell.events[eventIndex] = event;
      setAllLocalEvent(events);
      setAllEvent(events);
    }
  };

  return (
    <>
      <h1 className="text-center font-bold">
        {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h1>
      <div className="w-full grid grid-cols-7 border-gray-500 border-[0.25px] border-solid">
        {weekDays.map((day, index) => {
          return <CalendarHeader key={index} text={day} />;
        })}
        <CalendarEmptyCell gap={topGap} />
        {datesArray.map((date, index) => {
          return (
            <CalendarCell
              key={index}
              date={date.getDate()}
              cell={allEvent?.find(
                (event) => event.timestamp === date.getTime()
              )}
              onAddClick={(date) => {
                setAddModalOpen(true);
                setAddDate(date);
              }}
              onEditClick={(timestamp: number, event: TEvent) => {
                setEditEvent({
                  timestamp,
                  event,
                });
                setEditModalOpen(true);
              }}
              onDeleteClick={(timestamp: number, event: TEvent) => {
                const events = allEvent;
                const eventIndex = allEvent.findIndex(
                  (event) => event.timestamp === timestamp
                );
                if (eventIndex !== -1) {
                  events[eventIndex].events = events[eventIndex].events.filter(
                    (mEvent) => mEvent !== event
                  );
                  setAllLocalEvent(events);
                  setAllEvent(events);
                }
              }}
            />
          );
        })}
        <CalendarEmptyCell gap={bottomGap} />
      </div>
      <AddModal
        date={addDate}
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        onAddEventSubmit={onAddSubmit}
      />
      {editEvent && (
        <EditModal
          timestamp={editEvent.timestamp}
          event={editEvent.event}
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          onEditEventSubmit={onEditSubmit}
        />
      )}
    </>
  );
};

export default Home;
