/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@components/Input";
import Modal from "@components/Modal";
import { getRandomColor } from "@utils/helper";
import { TEvent, TFormEvent } from "@utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  date: number;
  addModalOpen: boolean;
  setAddModalOpen: Dispatch<SetStateAction<boolean>>;
  onAddEventSubmit: (timestamp: number, event: TEvent) => void;
}

const AddModal: React.FC<Props> = ({
  date,
  addModalOpen,
  setAddModalOpen,
  onAddEventSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormEvent>();
  const today = new Date();
  const [mDate, setMDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), date)
  );

  useEffect(() => {
    setMDate(new Date(today.getFullYear(), today.getMonth(), date));
  }, [date]);

  const onSubmit = (value: TFormEvent) => {
    const [hours, minutes] = value.time.split(":");
    const newDate = new Date(
      mDate.getFullYear(),
      mDate.getMonth(),
      mDate.getDate(),
      Number(hours),
      Number(minutes)
    )
    const color = getRandomColor();
    onAddEventSubmit(mDate.getTime(), {
      id: `${newDate}-${color}-${value.eventName}`,
      date: newDate,
      eventName: value.eventName,
      email: value.email,
      color: color,
    });
    reset();
    setAddModalOpen(false);
  };

  return (
    <Modal isModalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-2xl font-bold">
          Add event for{" "}
          {mDate.toLocaleString("id-ID", {
            month: "2-digit",
            year: "numeric",
            day: "numeric",
          })}
        </p>
        <Input
          register={register}
          label="Event name"
          name="eventName"
          errors={errors}
          type="text"
        />
        <Input
          register={register}
          label="E-mail"
          name="email"
          errors={errors}
          type="email"
        />
        <Input
          register={register}
          label="Time"
          name="time"
          errors={errors}
          type="time"
        />
        <button className="text-lg text-white p-3 rounded-lg bg-gray-800">
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddModal;
