import AddModal from "@components/AddModal";
import CalendarCell from "@components/CalendarCell";
import CalendarEmptyCell from "@components/CalendarEmptyCell";
import {
  getAllLocalEvent,
  getStringDateForDateCell,
  setAllLocalEvent,
} from "@utils/helper";
import { TDateCell, TEditEvent, TEvent } from "@utils/types";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CalendarHeader from "../components/CalendarHeader";
import EditModal from "@components/EditModal";

const Home: NextPage = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
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
  const bottomGap = Math.floor((lastDayOfMonth.getDate() + topGap) / 7);
  const datesArray = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, index) => {
      return new Date(today.getFullYear(), today.getMonth(), index + 1);
    }
  );

  const onAddSubmit = (date: string, event: TEvent) => {
    const events = [...allEvent];
    const eventIndex = events.findIndex((event) => event.date === date);
    if (eventIndex !== -1) {
      events[eventIndex].events.push(event);
    } else {
      events.push({
        date: date,
        events: [event],
      });
    }
    setAllEvent(events);
  };

  const onEditSubmit = (date: string, event: TEvent) => {
    const events = [...allEvent];
    const dateCellIndex = events.findIndex((event) => event.date === date);
    const eventIndex = events?.[dateCellIndex]?.events.findIndex(
      (mEvent) => mEvent.id === event.id
    );
    if (
      typeof dateCellIndex !== "undefined" &&
      typeof eventIndex !== "undefined"
    ) {
      events[dateCellIndex].events[eventIndex] = event;
      setAllEvent(events);
    }
  };

  useEffect(() => {
    setAllLocalEvent(allEvent);
  }, [allEvent]);

  return (
    <div className="min-w-[1500px]">
      <h1 className="text-center font-bold">
        {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h1>
      <div className="w-full grid grid-cols-7 border-[0.25px] border-gray-500 border-solid">
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
                (event) => event.date === getStringDateForDateCell(date)
              )}
              onAddClick={(date) => {
                setAddModalOpen(true);
                setAddDate(date);
              }}
              onEditClick={(date: string, event: TEvent) => {
                setEditEvent({
                  date,
                  event,
                });
                setEditModalOpen(true);
              }}
              onDeleteClick={(date: string, event: TEvent) => {
                let dateCells = [...allEvent];
                const dateCellIndex = dateCells.findIndex(
                  (dateCell) => dateCell.date === date
                );
                const eventIndex = dateCells[dateCellIndex].events.findIndex(
                  (mEvent) => mEvent.id == event.id
                );
                if (dateCellIndex !== -1 && eventIndex !== -1) {
                  dateCells[dateCellIndex].events = dateCells[
                    dateCellIndex
                  ].events.filter((mEvent) => mEvent.id !== event.id);

                  if (dateCells[dateCellIndex].events.length === 0) {
                    dateCells = dateCells.filter(
                      (dateCell) => dateCell.date !== date
                    );
                  }
                  setAllEvent(dateCells);
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
          date={editEvent.date}
          event={editEvent.event}
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          onEditEventSubmit={onEditSubmit}
        />
      )}
    </div>
  );
};

export default Home;
