"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount, IUser } from "@fetchers";
import { useAppDispatch } from "@hooks";
import { setUser } from "@reducers";
import { userSchema } from "@/schema/schema";
import { Button, TextField } from "@atoms";
import { alert } from "@toast";
import { alertFeedBack } from "@constants";
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          name="name"
          placeholder="Ingresá nombre"
          label="Nombre"
          register={register}
          required
          error={errors.name?.message}
        />
        <TextField
          type="number"
          name="accountNumber"
          placeholder="Ingresá tu número de cuenta"
          label="Número de cuenta"
          register={register}
          required
          error={errors.accountNumber?.message}
        />
        <TextField
          type="number"
          name="balance"
          placeholder="Ingresá tu saldo inicial"
          label="Saldo inicial"
          register={register}
          required
          error={errors.balance?.message}
        />
        <div className={styles.button_container}>
          <Button type="submit">
            <p className={styles.button_text}>Ingresar</p>
          </Button>
        </div>
      </form>
    </section>
  );
}
