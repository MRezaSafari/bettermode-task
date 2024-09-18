import { cn } from "@bettermode/utilities";
import { FC, InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  weight?: "small" | "default";
}

const Input: FC<Props> = ({ onChange, icon, weight, ...rest }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 border border-coal-border overflow-hidden backdrop-blur-md bg-coal-foreground/60 text-white shadow-[inset_0_0_1px_1px_#1b1b1d,0_0_4px_0px_rgb(0,0,0,0.1)] focus-within:shadow-[inset_0_0_3px_1px_#2563eb,0_0_4px_0px_rgb(0,0,0,0.1)] focus-within:border-blue-500 transition-all",
        {
          "min-w-[250px] rounded-xl": weight === "small",
          "min-w-[350px] rounded-2xl": weight === "default",
        }
      )}
    >
      {icon && <span>{icon}</span>}
      <input
        {...rest}
        onChange={onChange}
        className={cn(
          "border-none bg-transparent font-light w-full  text-sm outline-none",
          {
            "py-2": weight === "small",
            "py-5": weight === "default",
          }
        )}
      />
    </div>
  );
};

export default Input;
