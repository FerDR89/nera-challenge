import * as yup from "yup";

export const HomeFormSchema = yup
  .object({
    name: yup.string().min(2).max(20).required(),
    accountNumber: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("can not be empty")
      .min(1)
      .positive()
      .moreThan(0),
    balance: yup.number().positive().moreThan(0).required(),
  })
  .required();
