import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AppProvider;
