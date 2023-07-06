/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@components/Input";
import Modal from "@components/Modal";
import { getRandomColor } from "@utils/helper";
import { TEvent, TFormEvent } from "@utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  date: string;
  event: TEvent;
  editModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  onEditEventSubmit: (date: string, event: TEvent) => void
}

const EditModal: React.FC<Props> = ({ date, event, editModalOpen, setEditModalOpen, onEditEventSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormEvent>({
    defaultValues: {
      email: event.email,
      eventName: event.eventName,
      time: event.date.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }
      ).replace("24:", "00:")
    }
  })

  useEffect(() => {
    reset({
      email: event.email,
      eventName: event.eventName,
      time: event.date.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }
      ).replace("24:", "00:")
    })
  }, [event])
  
  const onSubmit = (value: TFormEvent) => {
    const mDate = event.date
    const [hours, minutes] = value.time.split(":")
    mDate.setHours(Number(hours))
    mDate.setMinutes(Number(minutes))
    onEditEventSubmit(date, {
      ...event,
      date: mDate,
      eventName: value.eventName,
      email: value.email,
    })
    reset()
    setEditModalOpen(false)
  }

  return (
    <Modal isModalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-2xl font-bold">Edit event {event.eventName} for {event.date.toLocaleString("id-ID", { month: "2-digit", year: "numeric", day: "2-digit" })}</p>
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
        <button className="text-lg text-white p-3 rounded-lg bg-gray-800">Edit</button>
      </form>
    </Modal>
  )
}

export default EditModal