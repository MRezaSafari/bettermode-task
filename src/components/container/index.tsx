import { cn } from "@bettermode/utilities";
import { FC, ReactNode } from "react";

interface Props {
  withPadding?: boolean;
  children: ReactNode;
}

const Container: FC<Props> = ({ withPadding = true, children }) => {
  return (
    <div
      className={cn("container mx-auto", {
        "px-4": withPadding,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
