import React, { Ref } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./textfield.module.css";

interface TextFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required: boolean;
  error?: string;
}

const TextField = ({
  label,
  type,
  placeholder,
  name,
  register,
  required,
  error,
}: TextFieldProps) => {
  return (
    <fieldset>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        {...register(name, { required })}
      />
      {error && <p>{error}</p>}
    </fieldset>
  );
};

export default TextField;
