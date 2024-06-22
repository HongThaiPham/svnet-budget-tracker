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
  years: GetHistoryPeriodsResponseType;
};

const YearSelector: React.FC<Props> = ({ period, setPeriod, years }) => {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) =>
        setPeriod({
          month: period.month,
          year: parseInt(value),
        })
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelector;
