import type { NextPage } from "next";
import CalendarHeader from "../components/CalendarHeader";
import CalendarCell from "@components/CalendarCell";
import { useState } from "react";
import { IMapper, TDateCell, TEvent } from "@utils/types";
import CalendarEmptyCell from "@components/CalendarEmptyCell";

const Home: NextPage = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
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
      weekDay === today.toLocaleDateString("en-US", { weekday: "long" })
  ) + 1;
  const bottomGap = (lastDayOfMonth.getDate() + topGap) % 7;
  const datesArray = Array.from(
    { length: lastDayOfMonth.getDate() - 1 },
    (_, index) => {
      return new Date(today.getFullYear(), today.getMonth(), index + 1);
    }
  );

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
          return <CalendarCell key={index} date={date.getDate()} events={[]} />;
        })}
        <CalendarEmptyCell gap={bottomGap} />
      </div>
    </>
  );
};

export default Home;
