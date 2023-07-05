/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@components/Input";
import Modal from "@components/Modal";
import { getRandomColor } from "@utils/helper";
import { TEvent, TFormEvent } from "@utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  timestamp: number;
  event: TEvent;
  editModalOpen: boolean;
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
  onEditEventSubmit: (timestamp: number, event: TEvent) => void
}

const EditModal: React.FC<Props> = ({ timestamp, event, editModalOpen, setEditModalOpen, onEditEventSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormEvent>({
    defaultValues: {
      email: event.email,
      eventName: event.eventName,
      time: `${event.date.getHours()}:${event.date.getMinutes()}`
    }
  })

  useEffect(() => {
    reset({
      email: event.email,
      eventName: event.eventName,
      time: `${event.date.getHours()}:${event.date.getMinutes()}`
    })
  }, [event])
  
  const onSubmit = (value: TFormEvent) => {
    console.log(value)
    const date = event.date
    const [hours, minutes] = value.time.split(":")
    date.setHours(Number(hours))
    date.setMinutes(Number(minutes))
    onEditEventSubmit(timestamp, {
      ...event,
      date: date,
      eventName: value.eventName,
      email: value.email,
    })
    reset()
    setEditModalOpen(false)
  }

  return (
    <Modal isModalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-2xl font-bold">Edit event {event.eventName} for {event.date.toLocaleString("id-ID", { month: "2-digit", year: "numeric", day: "numeric" })}</p>
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