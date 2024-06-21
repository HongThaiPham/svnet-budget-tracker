import React, { PropsWithChildren } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  isLoading: boolean;
  fullWidth?: boolean;
} & PropsWithChildren;

const SkeletonWapper: React.FC<Props> = ({
  children,
  isLoading,
  fullWidth = true,
}) => {
  if (!isLoading) return children;
  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWapper;
