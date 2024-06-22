"use client";
import { GetHistoryPeriodsResponseType } from "@/app/api/history/period/route";
import { PeriodType } from "@/types/TimeFrame.type";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  period: PeriodType;
  setPeriod: (period: PeriodType) => void;
};

const MonthSelector: React.FC<Props> = ({ period, setPeriod }) => {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) =>
        setPeriod({
          year: period.year,
          month: parseInt(value),
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from(Array(12).keys()).map((month) => {
          const monthStr = new Date(period.year, month, 1).toLocaleString(
            "default",
            { month: "long" }
          );
          return (
            <SelectItem key={month} value={month.toString()}>
              {monthStr}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;
