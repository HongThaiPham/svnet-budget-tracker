"use client";
import useCategories from "@/hooks/use-categories";
import { TransactionType } from "@/types/Transaction.type";
import React from "react";
import SkeletonWapper from "../commons/SkeletonWapper";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { PlusSquare, TrendingDown, TrendingUp } from "lucide-react";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import CategoryCard from "./CategoryCard";

type Props = {
  type: TransactionType;
};

const CategoryList: React.FC<Props> = ({ type }) => {
  const categoryQuery = useCategories(type);

  const dataAvailable = categoryQuery.data && categoryQuery.data.length > 0;
  return (
    <SkeletonWapper isLoading={categoryQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-rose-400/10 p-2 text-rose-500" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              )}
              <div>
                {type === "income" ? "Incomes" : "Expenses"} Categories
                <div className="text-sm text-muted-foreground">
                  Sorted by name
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              successCallback={() => categoryQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable ? (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p className="">
              No{" "}
              <span
                className={cn(
                  "m-1",
                  type === "income" ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {type}
              </span>{" "}
              categories found
            </p>
            <p className="text-sm text-muted-foreground">
              Create one to start tracking your {type} transactions
            </p>
          </div>
        ) : (
          <div className="grid grid-flow-col gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryQuery.data?.map((category: Category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWapper>
  );
};

export default CategoryList;
