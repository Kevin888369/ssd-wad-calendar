import Input from "@components/Input";
import Modal from "@components/Modal"
import { TEvent } from "@utils/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface Props {
  date: number;
  addModalOpen: boolean;
  setAddModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddModal: React.FC<Props> = ({ date, addModalOpen, setAddModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TEvent>()
  const today = new Date()
  const [mDate, setMDate] = useState(new Date(today.getFullYear(), today.getMonth(), date))
  
  useEffect(() => {
    setMDate(new Date(today.getFullYear(), today.getMonth(), date))
  }, [date])
  
  const onSubmit = () => {

  }

  return (
    <Modal isModalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-2xl font-bold">Add event for {mDate.toLocaleString("id-ID", { month: "2-digit", year: "numeric", day: "numeric" })}</p>
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
        <button className="">Add</button>
      </form>
    </Modal>
  )
}

export default AddModal