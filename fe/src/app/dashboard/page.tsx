"use client";
import Button from "@/components/atoms/Button/Button";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectUser } from "@/lib/reducers/userSlice";
import styles from "./dashboard.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { DashBoardFormSchema } from "@/schema/schema";
import TextField from "@/components/atoms/TextField/TextField";

export default function DashBoard() {
  const { accountId } = useAppSelector(selectUser);

  interface ICashIn {
    cashInAmount?: number;
  }

  interface ICashOut {
    cashOutAmount?: number;
  }

  const {
    handleSubmit: handleSubmitCashIn,
    register: cashInRegister,
    reset: resetCashIn,
    formState: { errors: cashInError },
  } = useForm<ICashIn>({
    mode: "onSubmit",
    resolver: yupResolver(DashBoardFormSchema),
  });

  const onSubmitCashIn: SubmitHandler<ICashIn> = (data) => {
    console.log("CASHIN", data);
    resetCashIn();
  };

  const {
    handleSubmit: handleSubmitCashOut,
    register: cashOutRegister,
    reset: resetCashOut,
    formState: { errors: cashOutError },
  } = useForm<ICashOut>({
    mode: "onSubmit",
    resolver: yupResolver(DashBoardFormSchema),
  });

  const onSubmitCashOut: SubmitHandler<ICashOut> = (data) => {
    console.log("CASHOUT", data);
    resetCashOut();
  };

  return (
    <section className={styles.main}>
      <div className={styles.balance_container}>
        <h2>Tu saldo $10</h2>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmitCashIn(onSubmitCashIn)}
      >
        <TextField
          type="number"
          name="cashInAmount"
          placeholder="Ingresá el monto que querés depositar"
          label="Ingresar dinero"
          register={cashInRegister}
          required
          error={cashInError.cashInAmount?.message}
        />

        <div className={styles.button_container}>
          <Button type="submit">
            <p className={styles.button_text}>Depositar</p>
          </Button>
        </div>
      </form>
      <form
        className={styles.form}
        onSubmit={handleSubmitCashOut(onSubmitCashOut)}
      >
        <TextField
          type="number"
          name="cashOutAmount"
          placeholder="Ingresá el monto que querés extraer"
          label="Extraer dinero"
          register={cashOutRegister}
          required
          error={cashOutError.cashOutAmount?.message}
        />

        <div className={styles.button_container}>
          <Button type="submit">
            <p className={styles.button_text}>Extraer</p>
          </Button>
        </div>
      </form>
    </section>
  );
}
