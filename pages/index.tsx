import CalendarCell from "@components/CalendarCell";
import CalendarEmptyCell from "@components/CalendarEmptyCell";
import Modal from "@components/Modal";
import { LocalStorageEnum, TEvent } from "@utils/types";
import type { NextPage } from "next";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import CalendarHeader from "../components/CalendarHeader";
import AddModal from "@components/AddModal";

const Home: NextPage = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [addDate, setAddDate] = useState(-1)
  const [addModalOpen, setAddModalOpen] = useState(false)
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
      weekDay === firstDayOfMonth.toLocaleDateString("en-US", { weekday: "long" })
  );
  const bottomGap = (lastDayOfMonth.getDate() + topGap) % 7;
  const datesArray = Array.from(
    { length: lastDayOfMonth.getDate() - 1 },
    (_, index) => {
      return new Date(today.getFullYear(), today.getMonth(), index + 1);
    }
  );

  const onAddSubmit = (event: TEvent) => {
    const allEvent = localStorage.getItem(LocalStorageEnum[LocalStorageEnum.ELocalEvent])

    localStorage.setItem(LocalStorageEnum[LocalStorageEnum.ELocalEvent], JSON.stringify([
      ...((allEvent && JSON.parse(allEvent)) ?? []),
      event
    ]))
  }

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
          return <CalendarCell key={index} date={date.getDate()} events={[]} onAddClick={(date) => {
            setAddModalOpen(true)
            setAddDate(date)
          }} />;
        })}
        <CalendarEmptyCell gap={bottomGap} />
      </div>
      <AddModal date={addDate} addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} onAddEventSubmit={onAddSubmit} />
    </>
  );
};

export default Home;
