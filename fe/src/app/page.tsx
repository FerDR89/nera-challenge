"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount, IUser } from "@fetchers";
import { useAppDispatch } from "@hooks";
import { setUser } from "@reducers";
import { userSchema } from "@schema";
import { Form } from "@molecules";
import { alert } from "@toast";
import { alertFeedBack, homeForm } from "@constants";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: createAccount,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    mode: "onSubmit",
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<IUser> = async (formData) => {
    try {
      const response = await mutation.mutateAsync(formData);
      if (response?.errorNumber === 1) {
        alert({
          title: alertFeedBack.account_not_found.title,
          icon: alertFeedBack.account_not_found.icon,
        });
      }
      if (response.id) {
        alert({
          title: alertFeedBack.create_account_success.title,
          icon: alertFeedBack.create_account_success.icon,
        });
        dispatch(
          setUser({
            ...formData,
            accountId: response.id,
          })
        );
        router.push("dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>Bienvenido</h1>
      <Form
        buttonText="Ingresar"
        formOptions={homeForm}
        error={errors}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        required
      />
    </section>
  );
}
