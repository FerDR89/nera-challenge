import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TFormCommonOptions } from "@components/molecules/form/Form";
import styles from "./selectfield.module.css";

export type TSelectOptions = { value: string; text: string };

type TSelectField = TFormCommonOptions & {
  selectOptions: TSelectOptions[];
  register: UseFormRegister<any>;
  required: boolean;
  error?: string;
};

const SelectField = ({
  name,
  selectOptions,
  label,
  register,
  required,
  error,
}: TSelectField) => {
  return (
    <fieldset className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        className={styles.select}
        {...register(name, { required })}
        id={name}
      >
        {selectOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
      {
        <div className={styles.error_container}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      }
    </fieldset>
  );
};

export default SelectField;
