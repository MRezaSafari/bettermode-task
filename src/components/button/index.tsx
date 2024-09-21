import { cn } from "@bettermode/utilities";
import { IconLoader2 } from "@tabler/icons-react"; // Import the loader icon
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

// Define the button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center font-light rounded-lg transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success:
          "bg-green-700 text-white hover:bg-green-700 focus:ring-green-500",
        info: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
        mute: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
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

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean;
  as?: "button" | "link";
}

type ButtonElementProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
type LinkElementProps = BaseButtonProps & LinkProps;

type ButtonProps = ButtonElementProps | LinkElementProps;

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  as = "button",
  loading,
  children,
  ...props
}) => {
  const isLink = (props: ButtonProps): props is LinkElementProps =>
    as === "link";

  if (isLink(props)) {
    const { to, ...linkProps } = props;
    return (
      <Link
        to={to}
        className={cn(
          buttonVariants({ variant, size }),
          { "opacity-30 cursor-not-allowed": loading },
          className
        )}
        {...linkProps}
      >
        {loading ? <IconLoader2 className="animate-spin" /> : children}
      </Link>
    );
  }

  const buttonProps = props as ButtonElementProps;

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        { "opacity-30 cursor-not-allowed": loading || buttonProps.disabled },
        className
      )}
      disabled={loading || buttonProps.disabled}
      {...buttonProps}
    >
      {loading ? <IconLoader2 className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
