import { GetHistoryPeriodsResponseType } from "@/app/api/history/period/route";
import { useQuery } from "@tanstack/react-query";

const useHistoryPeriod = () => {
  return useQuery<GetHistoryPeriodsResponseType>({
    queryKey: ["overview", "history", "periods"],
    queryFn: async () => {
      const response = await fetch("/api/history/period");
      return response.json();
    },
  });
};

export default useHistoryPeriod;
