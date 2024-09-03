import React from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./textfield.module.css";

interface ITextField {
  label?: string;
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
}: ITextField) => {
  return (
    <fieldset className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type}
        id={name}
        {...register(name, { required })}
        className={styles.input}
      />
      {
        <div className={styles.error_container}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      }
    </fieldset>
  );
};

export default TextField;
