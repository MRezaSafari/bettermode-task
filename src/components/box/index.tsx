import { cn } from "@bettermode/utilities";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Box: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "border border-coal-border overflow-hidden bg-coal-foreground/60 backdrop-blur-sm text-white rounded-lg shadow-[inset_0_0_1px_1px_#1b1b1d,0_0_4px_0px_rgb(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
