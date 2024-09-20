import { cn } from "@bettermode/utilities";
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import { FC } from "react";

interface Props {
  isProcessing?: boolean;
  disabled: boolean;
  onClick: () => void;
}

const LoginButton: FC<Props> = ({
  onClick,
  isProcessing = false,
  disabled,
}) => {
  return (
    <button
      disabled={isProcessing || disabled}
      onClick={onClick}
      className={cn(
        "rounded-full hover:scale-110 transition-all bg-blue-600 p-5 shadow-[0px_0px_15px_0px_rgba(37,99,235,0.69)]",
        {
          "animate-pulse": isProcessing,
          "cursor-not-allowed  bg-gray-800 shadow-[0px_0px_15px_0px_rgba(30,41,59,0.69)]":
            disabled,
        }
      )}
    >
      {isProcessing && <IconLoader2 className="animate-spin" />}
      {!isProcessing && <IconArrowRight />}
    </button>
  );
};

export default LoginButton;
