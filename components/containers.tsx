import React from "react";
import { cn } from "@/lib/utils";
const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative  mx-auto w-full h-full bg-neutral-50 dark:bg-neutral-950 px-8 sm:px-10 md:px-14 ",
        className
      )}
    >
      <div className="hidden lg:block fixed right-0 top-0 h-full w-px bg-neutral-200 dark:bg-neutral-800" />
      {children}
    </div>
  );
};

export default Container;
