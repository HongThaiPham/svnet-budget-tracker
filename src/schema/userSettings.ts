import { CURRENCY_OPTIONS } from "@/lib/constants";
import { z } from "zod";

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = CURRENCY_OPTIONS.some((option) => option.value === value);
    if (!found) {
      throw new Error("Invalid currency");
    }
    return value;
  }),
});
