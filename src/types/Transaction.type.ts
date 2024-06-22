import { GetTransactionHistoryResponseType } from "@/app/api/transactions/history/route";

export type TransactionType = "income" | "expense";

export type TransactionHistoryRow = GetTransactionHistoryResponseType[0];
