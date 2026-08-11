import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("container mx-auto px-4", className)}>{children}</div>
  );
};

export default Container;
