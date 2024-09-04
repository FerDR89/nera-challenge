import { alert } from "@toast";
import { alertFeedBack } from "@constants";
import { requestFormatter } from "@lib/utils";

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

async function getBalance(accountId: string) {
  const [url, options] = requestFormatter({
    method: "GET",
    path: `/accounts/${accountId}/balance`,
  });

  try {
    const response = await fetch(url, options);
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

async function createAccount({ accountNumber, balance, name }: IUser) {
  const [url, options] = requestFormatter({
    method: "POST",
    path: "/accounts",
    body: {
      name,
      accountNumber,
      balance,
    },
  });

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    alert({
      title: alertFeedBack.generic_error.title,
      icon: alertFeedBack.generic_error.icon,
    });
  }
}

async function createTransaction({ accountId, amount, type }: ITransaction) {
  const [url, options] = requestFormatter({
    method: "POST",
    path: "/transactions",
    body: {
      accountId,
      amount,
      type,
    },
  });

  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    alert({
      title: alertFeedBack.generic_error.title,
      icon: alertFeedBack.generic_error.icon,
    });
  }
}

export { getBalance, createAccount, createTransaction };
