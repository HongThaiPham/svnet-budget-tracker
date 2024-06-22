"use client";
import React from "react";
import TooltipRow from "./TooltipRow";

type Props = any;

const CustomTooltip: React.FC<Props> = ({ active, payload, formater }) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;
  const { income, expense } = data;

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        formater={formater}
        label="Expense"
        value={expense}
        bgColor="bg-rose-500"
        textColor="text-rose-500"
      />
      <TooltipRow
        formater={formater}
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
      <TooltipRow
        formater={formater}
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-100"
        textColor="text-foreground"
      />
    </div>
  );
};

export default CustomTooltip;
