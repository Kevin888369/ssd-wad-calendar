import { IMapper } from "@utils/types";

interface Props {
  gap: number;
}

const gapClass: IMapper = {
  0: null,
  1: "col-span-1", 
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
}


const CalendarEmptyCell: React.FC<Props> = ({ gap }) => {
  return <div className={`bg-gray-400 border-[0.25px] border-gray-500 ${gapClass[gap] ?? ""}`}></div>;
};

export default CalendarEmptyCell;
