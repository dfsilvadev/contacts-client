import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  type ForwardRefRenderFunction,
} from "react";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "flex  w-full items-center justify-center rounded-sm  px-3 py-1.5 text-sm/4 font-medium  focus-visible:outline-2 focus-visible:outline-offset-2 ",
  {
    variants: {
      variant: {
        default:
          "bg-violet-800 text-slate-50 hover:bg-violet-800/90 focus-visible:outline-violet-900",
        destructive: "bg-red-600  hover:bg-red-600/90",
        outline: "border border-gray-800 bg-transparent  hover:bg-violet-800 ",
        ghost: "hover:bg-violet-800 ",
        link: "text-secondary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8",
        icon: "h-10 w-10",
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
