import { Category } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

type Props = {
  category: Category;
};

const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none text-muted-foreground hover:bg-rose-500/20"
            variant={"secondary"}
          >
            <Trash className="h-4 w-4" />
          </Button>
        }
        category={category}
      />
    </div>
  );
};

export default CategoryCard;
