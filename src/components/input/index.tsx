import { cn } from "@bettermode/utilities";
import { FC, InputHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { z, ZodString } from "zod";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  weight?: "small" | "default";
  schema?: ZodString;
  errorMessage?: string;
  onValidationChange?: (isValid: boolean) => void; 
}

const Input: FC<Props> = ({
  onChange,
  icon,
  weight = "default",
  schema,
  value,
  errorMessage,
  onValidationChange,
  ...rest
}) => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle change and validation
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // If schema is provided, validate the input
    if (schema) {
      try {
        schema.parse(value); // Validate the value
        setIsValid(true);
        setError(null); // Clear error if valid
      } catch (err) {
        if (err instanceof z.ZodError) {
          setIsValid(false);
          setError(errorMessage || err.errors[0].message); // Set error message
        }
      }
    }

    if (onChange) {
      onChange(event);
    }
  };

  // Notify parent component of validation status change
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [isValid, onValidationChange]);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex items-center gap-3 px-4 border overflow-hidden backdrop-blur-md bg-coal-foreground/60 text-white shadow-[inset_0_0_1px_1px_#1b1b1d,0_0_4px_0px_rgb(0,0,0,0.1)] transition-all",
          {
            "md:min-w-[250px] rounded-xl": weight === "small",
            "md:min-w-[350px] rounded-2xl": weight === "default",
            "border-coal-border focus-within:border-blue-500":
              isValid || !schema,
            "border-red-500 focus-within:border-red-500 shadow-[inset_0_0_3px_1px_#f87171,0_0_4px_0px_rgb(0,0,0,0.1)]":
              !isValid && schema,
          }
        )}
      >
        {icon && <span>{icon}</span>}
        <input
          {...rest}
          value={value}
          onChange={handleChange}
          className={cn(
            "border-none bg-transparent font-light w-full text-sm outline-none",
            {
              "py-2": weight === "small",
              "py-5": weight === "default",
            }
          )}
        />
      </div>
      <span className="text-red-500 text-xs mt-1 text-center h-3">
        {!isValid && error && error}
      </span>
    </div>
  );
};

export default Input;
