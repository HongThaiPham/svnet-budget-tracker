"use client";
import useStatsBalance from "@/hooks/use-stats-balance";
import { getFormaterForCurrency } from "@/lib/utils";
import { UserSettings } from "@prisma/client";
import React, { useMemo } from "react";
import SkeletonWapper from "../commons/SkeletonWapper";
import StatsCard from "./StatsCard";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

type Props = {
  userSettings: UserSettings;
  dateRange: { from: Date; to: Date };
};

const StatsSection: React.FC<Props> = ({
  userSettings,
  dateRange: { from, to },
}) => {
  const statsBalance = useStatsBalance(from, to);

  const formater = useMemo(() => {
    return getFormaterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsBalance.data?.income ?? 0;
  const expense = statsBalance.data?.expense ?? 0;

  const balance = income - expense;
  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWapper isLoading={statsBalance.isFetching}>
        <StatsCard
          formater={formater}
          value={income}
          title={"Income"}
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWapper>
      <SkeletonWapper isLoading={statsBalance.isFetching}>
        <StatsCard
          formater={formater}
          value={expense}
          title={"Expense"}
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-rose-500 bg-rose-400/10" />
          }
        />
      </SkeletonWapper>
      <SkeletonWapper isLoading={statsBalance.isFetching}>
        <StatsCard
          formater={formater}
          value={balance}
          title={"Balance"}
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
        />
      </SkeletonWapper>
    </div>
  );
};

export default StatsSection;
