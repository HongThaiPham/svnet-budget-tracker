"use client";
import useStatsCategories from "@/hooks/use-stats-categories";
import { getFormaterForCurrency } from "@/lib/utils";
import { UserSettings } from "@prisma/client";
import React, { useMemo } from "react";
import SkeletonWapper from "../commons/SkeletonWapper";
import CategoriesStatsCard from "./CategoriesStatsCard";

type Props = {
  userSettings: UserSettings;
  dateRange: { from: Date; to: Date };
};

const CategoriesStats: React.FC<Props> = ({
  userSettings,
  dateRange: { from, to },
}) => {
  const statsCategories = useStatsCategories(from, to);
  const formater = useMemo(() => {
    return getFormaterForCurrency(userSettings.currency);
  }, [userSettings.currency]);
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
      <SkeletonWapper isLoading={statsCategories.isFetching}>
        <CategoriesStatsCard
          formater={formater}
          type={"income"}
          data={statsCategories.data || []}
        />
      </SkeletonWapper>
      <SkeletonWapper isLoading={statsCategories.isFetching}>
        <CategoriesStatsCard
          formater={formater}
          type={"expense"}
          data={statsCategories.data || []}
        />
      </SkeletonWapper>
    </div>
  );
};

export default CategoriesStats;
