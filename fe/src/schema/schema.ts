import { validationFeedBack } from "@/constants/constants";
import * as yup from "yup";

export const userSchema = yup
  .object({
    name: yup
      .string()
      .required(validationFeedBack.required)
      .matches(/^[a-zA-Z\s]+$/, validationFeedBack.validName)
      .min(2, validationFeedBack.minCharacters)
      .max(20, validationFeedBack.maxCharacters)
      .trim(),

    accountNumber: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required(validationFeedBack.required)
      .min(1, validationFeedBack.minNumber)
      .max(20, validationFeedBack.maxCharacters)
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

export const cashInOutSchema = yup.object({
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(validationFeedBack.required)
    .min(1, validationFeedBack.minNumber)
    .positive()
    .moreThan(0, validationFeedBack.moreThan),
  type: yup
    .string()
    .required(validationFeedBack.required)
    .matches(/^(cash_in|cash_out)$/),
});
