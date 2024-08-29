import { validationFeedBack } from "@/constants/constants";
import * as yup from "yup";

export const userSchema = yup
  .object({
    name: yup
      .string()
      .min(2, validationFeedBack.minCharacters)
      .max(20, validationFeedBack.maxCharacters)
      .required(validationFeedBack.required),
    accountNumber: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required(validationFeedBack.required)
      .min(1, validationFeedBack.minNumber)
      .positive()
      .moreThan(0, validationFeedBack.moreThan),
    balance: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required(validationFeedBack.required)
      .positive()
      .moreThan(0, validationFeedBack.moreThan)
      .required(validationFeedBack.required),
  })
  .required();

export const cashInSchema = yup.object({
  cash_in: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(validationFeedBack.required)
    .min(1, validationFeedBack.minNumber)
    .moreThan(0),
});
export const cashOutSchema = yup.object({
  cash_out: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(validationFeedBack.required)
    .min(1, validationFeedBack.minNumber)
    .moreThan(0),
});
