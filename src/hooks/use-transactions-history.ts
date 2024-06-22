import { DateToUTCDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useTransactionsHistory = (from: Date, to: Date) => {
  return useQuery({
    queryKey: ["transactions", "history", from, to],
    queryFn: async () =>
      fetch(
        `/api/transactions/history?from=${DateToUTCDate(
          from
        )}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });
};

export default useTransactionsHistory;
