import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";

interface Account {
  name: string;
  accountNumber: string;
  balance: number;
  accountId: string;
}

interface Transaction {
  transactionID: string;
  accountId: string;
  type: string;
  amount: number;
  date: Date;
}

interface Data {
  accounts: Account[];
  transactions: Transaction[];
}

const app = express();
app.use(
  cors({
    origin: "http://localhost:3031",
  })
);
const port = 3000;

// Configuración de lowdb
const db = new Low<Data>(new JSONFile("db.json"), {
  accounts: [],
  transactions: [],
});

// Middleware para parsear JSON
app.use(express.json());

// Inicialización de la base de datos
async function initDB() {
  await db.read();
  db.data ||= { accounts: [], transactions: [] };
  await db.write();
}
initDB();

/*Crea una nueva cuenta bancaria. Este endpoint debería aceptar detalles de la cuenta como el nombre y el número de cuenta (FALTA EL SALDO INICIAL), y devolver un ID de cuenta.*/
app.post("/accounts", async (req, res) => {
  const { name, accountNumber, balance } = req.body;
  const parsedBalance = Number(balance);

  const findedAccount = db.data.accounts.find(
    (a) => a.accountNumber === accountNumber
  );

  if (findedAccount) {
    return res.status(200).json({ id: findedAccount.accountId });
  }

  const newAccount: Account = {
    accountId: nanoid(),
    name,
    accountNumber,
    balance: parsedBalance,
  };

  db.data.accounts.push(newAccount);
  await db.write();

  res.status(201).json({ id: newAccount.accountId });
});

// Obtiene el balance de la cuenta bancaria
app.get("/accounts/:id/balance", async (req, res) => {
  const accountId = req.params.id;
  const account = db.data.accounts.find((acc) => acc.accountId === accountId);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  res.json({ balance: account.balance });
});

// Realiza una transacción bancaria. Este endpoint debería aceptar detalles de la transacción como el ID de la cuenta, el tipo de transacción (depósito o retiro) y el monto de la transacción
app.post("/transactions", async (req, res) => {
  const { accountId, type, amount } = req.body;
  const parsedAmount = Number(amount);
  const account = db.data.accounts.find((acc) => acc.accountId === accountId);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  if (type === "cash_in") {
    account.balance += parsedAmount;
  } else if (type === "cash_out") {
    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }
    account.balance -= parsedAmount;
  } else {
    return res.status(400).json({ error: "Invalid transaction type" });
  }

  const transaction: Transaction = {
    transactionID: nanoid(),
    accountId,
    type,
    amount: parsedAmount,
    date: new Date(),
  };
  db.data.transactions.push(transaction);
  await db.write();

  res.status(201).json({ message: "Transaction successful" });
});

app.listen(port, () => {
  console.log(`Server ON http://localhost:${port}`);
});
