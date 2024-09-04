"use client";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTransaction, getBalance, ITransaction } from "@fetchers";
import { useAppSelector } from "@hooks";
import { selectUser } from "@reducers";
import { cashInOutSchema } from "@schema";
import { alert } from "@toast";
import { alertFeedBack, dashBoardForm } from "@constants";
import styles from "./dashboard.module.css";
import { Form } from "@components/molecules";

interface ICashInOut {
  amount: number;
  type: string;
}

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
      if (response?.error) {
        alert({
          title: alertFeedBack.generic_error.title,
          icon: alertFeedBack.generic_error.icon,
        });
        return;
      }
      setBalance(response.balance);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBalance(accountId);
  }, [accountId, fetchBalance, mutation.data?.message]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ICashInOut>({
    mode: "onSubmit",
    resolver: yupResolver(cashInOutSchema),
  });

  const onSubmit: SubmitHandler<ICashInOut> = async (formData) => {
    const transaction: ITransaction = {
      accountId,
      amount: formData.amount,
      type: formData.type,
    };

    try {
      const response = await mutation.mutateAsync(transaction);
      if (response.errorNumber === 1) {
        alert({
          title: alertFeedBack.account_not_found.title,
          icon: alertFeedBack.account_not_found.icon,
        });
        return;
      }
      if (response.errorNumber === 2) {
        alert({
          title: alertFeedBack.insufficient_funds.title,
          icon: alertFeedBack.insufficient_funds.icon,
        });
        return;
      }
      if (response.errorNumber === 3) {
        alert({
          title: alertFeedBack.invalid_transaction.title,
          icon: alertFeedBack.invalid_transaction.icon,
        });
        return;
      }
      alert({
        title: alertFeedBack.transaction.title,
        icon: alertFeedBack.transaction.icon,
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset();
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

      <Form
        onSubmit={handleSubmit(onSubmit)}
        formOptions={dashBoardForm}
        register={register}
        required
        buttonText="Aceptar"
        error={errors}
      />
    </section>
  );
}
