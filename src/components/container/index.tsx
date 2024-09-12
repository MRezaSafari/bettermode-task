import { cn } from "@bettermode/utilities";
import { FC } from "react";

interface Props {
  withPadding?: boolean;
}

const Container: FC<Props> = ({ withPadding }) => {
  return <div className={cn("")}></div>;
};

export default Container;
