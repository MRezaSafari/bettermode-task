import { cn } from "@bettermode/utilities";
import { IconLoader2 } from "@tabler/icons-react"; // Import the loader icon
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

// Define the button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center font-light rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success:
          "bg-green-700 text-white hover:bg-green-700 focus:ring-green-500",
        info: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean; // Add a loading prop
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  loading,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        { "opacity-70 cursor-not-allowed": loading },
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <IconLoader2 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
