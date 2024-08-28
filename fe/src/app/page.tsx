"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/components/atoms/TextField/TextField";
import { HomeFormSchema } from "@/schema/schema";
import styles from "./page.module.css";
import Button from "@/components/atoms/Button/Button";

export default function Home() {
  const router = useRouter();

  interface IHomeForm {
    name: string;
    accountNumber: number;
    balance: number;
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IHomeForm>({
    mode: "onSubmit",
    resolver: yupResolver(HomeFormSchema),
  });

  const onSubmit: SubmitHandler<IHomeForm> = (data) => {
    //TODO: RESET FORM - REDUX - API
    console.log(data);
    // router.push("dashboard");
  };

  return (
    <main className={styles.main}>
      <h1>Bienvenido</h1>
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
    </main>
  );
}
