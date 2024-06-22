import { PeriodType, TimeFrameType } from "@/types/TimeFrame.type";
import { useQuery } from "@tanstack/react-query";

const useHistoryData = (timeFrame: TimeFrameType, period: PeriodType) => {
  return useQuery({
    queryKey: ["overview", "history", "data", timeFrame, period],
    queryFn: async () => {
      const response = await fetch(
        `/api/history/data?timeframe=${timeFrame}&year=${period.year}&month=${period.month}`
      );
      return response.json();
    },
  });
};

export default useHistoryData;
