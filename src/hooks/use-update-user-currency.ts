import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserCurrency = () => {
  return useMutation({
    mutationFn: UpdateUserCurrency,
  });
};

export default useUpdateUserCurrency;
