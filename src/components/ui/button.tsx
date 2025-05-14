import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  type ForwardRefRenderFunction,
} from "react";

import { cn } from "@/libs/utils/cn";

const buttonVariants = cva(
  "flex gap-2 w-full items-center text-slate-50 justify-center rounded-sm  px-3 py-1.5 text-sm/4 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-90 disabled:text-gray-700",
  {
    variants: {
      variant: {
        default:
          "bg-violet-800  hover:bg-violet-800/90 focus-visible:outline-violet-900 ",
        destructive: "bg-red-600  hover:bg-red-600/90 ",
        outline: "border border-gray-800 bg-transparent  hover:bg-violet-800 ",
        ghost: "hover:bg-violet-800 ",
        link: "text-secondary underline-offset-4 hover:underline",
        icon: "border border-gray-800 bg-transparent  hover:bg-violet-800 w-12",
      },
      size: {
        default: "h-12",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends ButtonType, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { className, variant, size, asChild = false, ...props },
  ref
) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};

Button.displayName = "Button";

export default forwardRef(Button);
