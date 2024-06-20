import NavBar from "@/components/commons/NavBar";
import React, { PropsWithChildren } from "react";

type Props = {};

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <NavBar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
