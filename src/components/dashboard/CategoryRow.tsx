import { Category } from "@prisma/client";
import React from "react";

type Props = {
  category: Category;
};

const CategoryRow: React.FC<Props> = ({ category }) => {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
};

export default CategoryRow;
