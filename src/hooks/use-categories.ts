import { TransactionType } from "@/types/Transaction.type";
import { useQuery } from "@tanstack/react-query";

const useCategories = (type: TransactionType) => {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: async () => {
      const res = await fetch(`/api/categories?type=${type}`);
      return res.json();
    },
  });
};

export default useCategories;
