import { cn } from "@bettermode/utilities";
import { FC, ReactNode } from "react";

interface Props {
  withPadding?: boolean;
  children: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ withPadding = true, children, className }) => {
  return (
    <div
      className={cn("container mx-auto", className, {
        "px-4": withPadding,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
