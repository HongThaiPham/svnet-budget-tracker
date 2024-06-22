"use client";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import CountUp from "react-countup";

type Props = {
  formater: Intl.NumberFormat;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
};

const TooltipRow: React.FC<Props> = ({
  formater,
  label,
  value,
  bgColor,
  textColor,
}) => {
  const formaterFn = useCallback(
    (value: number) => formater.format(value),
    [formater]
  );
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-4 w-4 rounded-full", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp
            end={value}
            duration={0.5}
            preserveValue
            decimals={0}
            formattingFn={formaterFn}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TooltipRow;
