import { cn } from "@bettermode/utilities";
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import { FC } from "react";

interface Props {
  isProcessing?: boolean;
}

const LoginButton: FC<Props> = ({ isProcessing = true }) => {
  return (
    <button
      disabled={isProcessing}
      className={cn(
        "rounded-full hover:scale-110 transition-all bg-blue-600 p-5 shadow-[0px_0px_15px_0px_rgba(37,99,235,0.69)]",
        {
          "animate-pulse": isProcessing,
        }
      )}
    >
      {isProcessing && <IconLoader2 className="animate-spin" />}
      {!isProcessing && <IconArrowRight />}
    </button>
  );
};

export default LoginButton;
