import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="border border-coal-border overflow-hidden bg-coal-foreground text-white rounded-lg shadow-[inset_0_0_1px_1px_#1b1b1d,0_0_4px_0px_rgb(0,0,0,0.1)]">
      {children}
    </div>
  );
};

export default Container;
