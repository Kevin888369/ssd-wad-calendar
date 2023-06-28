interface Props {
  text: string;
}

const CalendarHeader: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-black text-center text-white pt-3 pb-8">{text}</div>
  );
};

export default CalendarHeader;
