"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppThemeProvider from "./AppThemeProvider";
import { Toaster } from "@/components/ui/sonner";
const queryClient = new QueryClient();
const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-right" />
      <AppThemeProvider>{children}</AppThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
