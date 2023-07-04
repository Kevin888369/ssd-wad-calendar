import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  type: HTMLInputTypeAttribute;
  errors: FieldErrors<any>;
}

const Input: React.FC<Props> = ({ label, name, register, type, errors }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg" htmlFor={name}>{label}</label>
      <input {...register(name, {
        required: `${label} can't be empty`
      })} name={name} type={type} className={"text-lg border border-gray-500 border-solid rounded-lg p-3"} />
      {errors[name]?.message && <p className="text-red-600">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default Input;
