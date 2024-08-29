import { alert } from "@/components/atoms/alert/alert";
import { alertFeedBack } from "@/constants/constants";

const BASE_URL = "http://localhost:3000";

export interface IUser {
  name: string;
  accountNumber: number;
  balance: number;
}
export interface ITransaction {
  accountId: string;
  type: string;
  amount: number;
}

export async function getBalance(accountId: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(
      BASE_URL + `/accounts/${accountId}/balance`,
      options
    );
    if (!response.ok) {
      return { error: "Service Unavailable" };
    }

    return await response.json();
  } catch (error) {
    alert({
      title: alertFeedBack.generic_error.title,
      icon: alertFeedBack.generic_error.icon,
    });
  }
}

export async function createAccount({ accountNumber, balance, name }: IUser) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      accountNumber,
      balance,
    }),
  };

  try {
    const response = await fetch(BASE_URL + "/accounts", options);
    return await response.json();
  } catch (error) {
    alert({
      title: alertFeedBack.generic_error.title,
      icon: alertFeedBack.generic_error.icon,
    });
  }
}

export async function createTransaction({
  accountId,
  amount,
  type,
}: ITransaction) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      amount,
      type,
    }),
  };

  try {
    const response = await fetch(BASE_URL + "/transactions", options);
    return await response.json();
  } catch (error) {
    alert({
      title: alertFeedBack.generic_error.title,
      icon: alertFeedBack.generic_error.icon,
    });
  }
}
