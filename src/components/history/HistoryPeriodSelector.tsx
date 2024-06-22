"use client";
import { PeriodType, TimeFrameType } from "@/types/TimeFrame.type";
import React from "react";
import SkeletonWapper from "../commons/SkeletonWapper";
import useHistoryPeriod from "@/hooks/use-history-period";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import YearSelector from "./YearSelector";
import MonthSelector from "./MonthSelector";

type Props = {
  period: PeriodType;
  setPeriod: (period: PeriodType) => void;
  timeFrame: TimeFrameType;
  setTimeFrame: (timeFrame: TimeFrameType) => void;
};

const HistoryPeriodSelector: React.FC<Props> = ({
  period,
  setPeriod,
  timeFrame,
  setTimeFrame,
}) => {
  const historyPeriod = useHistoryPeriod();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWapper isLoading={historyPeriod.isFetching} fullWidth={false}>
        <Tabs
          value={timeFrame}
          onValueChange={(value) =>
            setTimeFrame(value as unknown as TimeFrameType)
          }
        >
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWapper>
      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWapper isLoading={historyPeriod.isFetching} fullWidth={false}>
          <YearSelector
            period={period}
            setPeriod={setPeriod}
            years={historyPeriod.data || []}
          />
        </SkeletonWapper>
        {timeFrame === "month" ? (
          <SkeletonWapper
            isLoading={historyPeriod.isFetching}
            fullWidth={false}
          >
            <MonthSelector period={period} setPeriod={setPeriod} />
          </SkeletonWapper>
        ) : null}
      </div>
    </div>
  );
};

export default HistoryPeriodSelector;
