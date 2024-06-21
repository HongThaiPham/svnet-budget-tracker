import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import { DateToUTCDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const useStatsCategories = (from: Date, to: Date) => {
  return useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: async () => {
      const response = await fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      );
      if (!response.ok) {
        throw new Error("An error occurred while fetching categories stats");
      }
      return response.json();
    },
  });
};

export default useStatsCategories;
