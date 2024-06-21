import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import { TransactionType } from "@/types/Transaction.type";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";

type Props = {
  formater: Intl.NumberFormat;
  type: TransactionType;
  data: GetCategoriesStatsResponseType;
};

const CategoriesStatsCard: React.FC<Props> = ({ formater, type, data }) => {
  const filteredData = data.filter((d) => d.type === type);
  const total = filteredData.reduce(
    (acc, curr) => acc + (curr._sum?.amount || 0),
    0
  );
  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === "income" ? "Incomes" : "Expenses"} by categories
        </CardTitle>
        <div className="flex items-center justify-between gap-2">
          {filteredData.length === 0 ? (
            <div className="flex h-[60px] w-full flex-col items-center justify-center">
              No data for this period
              <p className="text-sm text-muted-foreground">
                Try selecting a different period or try add new{" "}
                {type === "income" ? "incomes" : "expenses"}
              </p>
            </div>
          ) : (
            <ScrollArea className="h-60 w-full px-4">
              <div className="flex w-full flex-col gap-4 p-4">
                {filteredData.map((item) => {
                  const amount = item._sum?.amount || 0;
                  const percentage = (amount * 100) / (total || amount);
                  return (
                    <div key={item.category} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-400">
                          {item.categoryIcon} {item.category}
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({percentage.toFixed(0)}%)
                          </span>
                        </span>
                        <span className="text-sm text-gray-400">
                          {formater.format(amount)}
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        indicator={
                          type === "income" ? "bg-emerald-500" : "bg-rose-500"
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default CategoriesStatsCard;
