"use client";
import React, { useCallback } from "react";
import { Card } from "../ui/card";
import CountUp from "react-countup";

type Props = {
  formater: Intl.NumberFormat;
  value: number;
  title: string;
  icon: React.ReactNode;
};

const StatsCard: React.FC<Props> = ({ formater, value, title, icon }) => {
  const formatFn = useCallback(
    (value: number) => {
      return formater.format(value);
    },
    [formater]
  );
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-center gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimal="2"
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
};

export default StatsCard;
