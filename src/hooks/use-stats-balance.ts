import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { DateToUTCDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useStatsBalance = (from: Date, to: Date) => {
  return useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: async () => {
      const response = await fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch balance stats");
      }
      return response.json();
    },
  });
};

export default useStatsBalance;
