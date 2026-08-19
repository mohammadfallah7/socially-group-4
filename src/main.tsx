import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Toaster } from "./components/ui/toast.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import router from "./router.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
