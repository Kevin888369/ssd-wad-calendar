import CalendarCell from "@components/CalendarCell";
import CalendarEmptyCell from "@components/CalendarEmptyCell";
import Modal from "@components/Modal";
import { TEvent } from "@utils/types";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CalendarHeader from "../components/CalendarHeader";

const Home: NextPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(-1)
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const {
    register,
    handleSubmit,
  } = useForm<TEvent>()
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
  const onSubmit = () => {

  }

  return (
    <>
      <h1 className="text-center font-bold">
        {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </h1>
      <div className="w-full grid grid-cols-7 border-gray-500 border-[0.25px]">
        {weekDays.map((day, index) => {
          return <CalendarHeader key={index} text={day} />;
        })}
        <CalendarEmptyCell gap={topGap} />
        {datesArray.map((date, index) => {
          return <CalendarCell key={index} date={date.getDate()} events={[]} onAddClick={(date) => setAddModalOpen(date)} />;
        })}
        <CalendarEmptyCell gap={bottomGap} />
      </div>
      
    </>
  );
};

export default Home;
