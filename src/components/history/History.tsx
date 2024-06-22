"use client";

import { getFormaterForCurrency } from "@/lib/utils";
import { PeriodType, TimeFrameType } from "@/types/TimeFrame.type";
import { UserSettings } from "@prisma/client";
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import HistoryPeriodSelector from "./HistoryPeriodSelector";
import useHistoryData from "@/hooks/use-history-data";
import SkeletonWapper from "../commons/SkeletonWapper";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

type Props = {
  userSettings: UserSettings;
};

const History: React.FC<Props> = ({ userSettings }) => {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrameType>("month");
  const [period, setPeriod] = React.useState<PeriodType>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const formater = useMemo(() => {
    return getFormaterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const historyData = useHistoryData(timeFrame, period);

  const dataAvailable = historyData.data && historyData.data.length > 0;

  return (
    <div className="container ">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />

            <div className="flex h-10 gap-2">
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 text-sm"
              >
                <div className="h-4 w-4 rounded-full bg-rose-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWapper isLoading={historyData.isFetching}>
            {dataAvailable ? (
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart
                  height={300}
                  data={historyData.data}
                  barCategoryGap={5}
                >
                  <defs>
                    <linearGradient id="incomeBar" x1={0} y1={0} x2={0} y2={1}>
                      <stop
                        offset={"0"}
                        stopColor="#10b981"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#10b981"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                    <linearGradient id="expenseBar" x1={0} y1={0} x2={0} y2={1}>
                      <stop
                        offset={"0"}
                        stopColor="#ef4444"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#ef4444"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray={"5 5"}
                    strokeOpacity={"0.2"}
                    vertical={false}
                  />
                  <XAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 5, right: 5 }}
                    dataKey={(data) => {
                      const { year, month, day } = data;
                      const date = new Date(year, month, day || 1);
                      if (timeFrame === "year") {
                        return date.toLocaleDateString("default", {
                          month: "long",
                        });
                      }
                      return date.toLocaleDateString("default", {
                        day: "2-digit",
                      });
                    }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey={"income"}
                    label="Income"
                    fill="url(#incomeBar)"
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Bar
                    dataKey={"expense"}
                    label="Expense"
                    fill="url(#expenseBar)"
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Tooltip
                    cursor={{
                      opacity: 0.1,
                    }}
                    content={(props) => (
                      <CustomTooltip {...props} formater={formater} />
                    )}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] flex-col items-center justify-center bg-background">
                No data for the selected period
                <p className="tex-sm text-muted-foreground">
                  Try select another period or add some transactions
                </p>
              </div>
            )}
          </SkeletonWapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
