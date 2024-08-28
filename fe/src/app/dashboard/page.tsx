"use client";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectUser } from "@/reducers/userSlice";
import { useAppSelector } from "@/hooks/hooks";
import { cashInSchema, cashOutSchema } from "@/schema/schema";
import Button from "@/components/atoms/Button/Button";
import TextField from "@/components/atoms/TextField/TextField";
import styles from "./dashboard.module.css";
import {
  createTransaction,
  getBalance,
  ITransaction,
} from "@/API/fetchers/fetchers";

export default function DashBoard() {
  const { accountId } = useAppSelector(selectUser);
  const [balance, setBalance] = useState(0);
  const mutation = useMutation({
    mutationFn: createTransaction,
  });

  const fetchBalance = useCallback(async (accountId: string) => {
    if (!accountId) return;
    try {
      const response = await getBalance(accountId);
      if (response) {
        setBalance(response.balance);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBalance(accountId);
  }, [accountId, fetchBalance, mutation.isSuccess]);

  interface ICashIn {
    cash_in: number;
  }

  interface ICashOut {
    cash_out: number;
  }

  const {
    handleSubmit: handleSubmitCashIn,
    register: cashInRegister,
    reset: resetCashIn,
    formState: { errors: cashInError },
  } = useForm<ICashIn>({
    mode: "onSubmit",
    resolver: yupResolver(cashInSchema),
  });

  const onSubmitCashIn: SubmitHandler<ICashIn> = async (formData) => {
    const transaction: ITransaction = {
      accountId,
      amount: Object.values(formData)[0],
      type: Object.keys(formData)[0],
    };

    try {
      const response = await mutation.mutateAsync(transaction);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      resetCashIn();
    }
  };

  const {
    handleSubmit: handleSubmitCashOut,
    register: cashOutRegister,
    reset: resetCashOut,
    formState: { errors: cashOutError },
  } = useForm<ICashOut>({
    mode: "onSubmit",
    resolver: yupResolver(cashOutSchema),
  });

  const onSubmitCashOut: SubmitHandler<ICashOut> = async (formData) => {
    const transaction = {
      accountId,
      amount: Object.values(formData)[0],
      type: Object.keys(formData)[0],
    };
    try {
      const response = await mutation.mutateAsync(transaction);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      resetCashOut();
    }
  };

  if (!accountId)
    return (
      <h2>Lo sentimos pero no podes ingresar sin un usuario registrado...</h2>
    );

  return (
    <section className={styles.main}>
      <div className={styles.balance_container}>
        {!balance && balance !== 0 ? (
          <h2>Cargando tu saldo...</h2>
        ) : (
          <h2
            className={`${balance === 0 ? styles.text_balance_error : ""}`}
          >{`Tu saldo es: $${balance}`}</h2>
        )}
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmitCashIn(onSubmitCashIn)}
      >
        <TextField
          type="number"
          name="cash_in"
          placeholder="Ingresá el monto que querés depositar"
          label="Ingresar dinero"
          register={cashInRegister}
          required
          error={cashInError.cash_in?.message}
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
          name="cash_out"
          placeholder="Ingresá el monto que querés extraer"
          label="Extraer dinero"
          register={cashOutRegister}
          required
          error={cashOutError.cash_out?.message}
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
