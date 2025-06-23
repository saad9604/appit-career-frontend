import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { LoaderCircle } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shadow-lg whitespace-nowrap rounded-full text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-secondary hover:border hover:border-white",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-black hover:border-white bg-transparent text-black hover:bg-black hover:text-white",
        outline2:
          "bg-transparent text-primary hover:bg-accent hover:text-accent-foreground dark:border-primary ",
        primary:
          "border border-primary text-primary bg-transparent hover:bg-accent/10 hover:text-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        muted:
          "bg-grey1 text-muted-foreground hover:bg-grey1/80 hover:text-primary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        ghostDestructive:
          "hover:bg-destructive text-destructive hover:text-white dark:hover:bg-destructive/50",
        icon: "hover:bg-grey1/50 hover:text-accent-foreground dark:hover:bg-backgtound/50",
        link: "text-primary dark:text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 sm:h-9 px-3 sm:px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-10 px-6 has-[>svg]:px-4",
        lg: "h-12 3xl:h-14 text-lg 3xl:text-xl px-12 3xl:px-14 has-[>svg]:px-6",
        xl: "h-16 3xl:h-20 text-2xl 3xl:text-[27px] px-12 3xl:px-14 has-[>svg]:px-6",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = (
  {
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    disabled = false,
    children,
    ...props
  },
  ref
) => {
  const Comp = asChild ? Slot : "button";

  // Determine if the button should be disabled
  const isDisabled = loading || disabled;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className }),
        {
          "cursor-not-allowed": isDisabled,
        },
        "group whitespace-nowrap flex gap-2 cursor-pointer um_transition"
      )}
      ref={ref}
      disabled={isDisabled}
      {...props}
    >
      <>
        {children}
        {loading && <LoaderCircle className="w-5 h-5 animate-spin" />}
      </>
    </Comp>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
