import React, { SyntheticEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button, TextField } from "@components/atoms";
import styles from "./form.module.css";

interface IForm {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
  register: UseFormRegister<any>;
  required: boolean;
  error: FieldErrors;
  formOptions: TFromProps[];
  buttonText: string;
}

export type TFormCommonOptions = {
  name: string;
  label?: string;
};

export type TFormConditional =
  | {
      type: "input";
      inputType: string;
      placeholder?: string;
    }
  | {
      type: "select";
      selectOptions: [{ value: string; text: string }];
    };

export type TFromProps = TFormCommonOptions & TFormConditional;

const Form = ({
  onSubmit,
  register,
  error: errorMessage,
  buttonText,
  formOptions,
}: IForm) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {formOptions.map((e) => {
        if (e.type === "input") {
          return (
            <TextField
              type={e.inputType}
              name={e.name}
              placeholder={e.placeholder}
              label={e.label}
              register={register}
              required
              error={errorMessage[e.name]?.message?.toString()}
              key={e.name}
            />
          );
        }
      })}

      <Button type="submit">
        <p className={styles.button_text}>{buttonText}</p>
      </Button>
    </form>
  );
};

export default Form;
