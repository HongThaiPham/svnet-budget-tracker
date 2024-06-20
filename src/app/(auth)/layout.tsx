import { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default layout;
