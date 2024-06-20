import React, { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
