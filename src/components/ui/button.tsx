import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent text-sm font-bold whitespace-nowrap transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-skyblue/50",
  {
    variants: {
      variant: {
        default: "bg-skyblue text-white shadow-[0_4px_12px_-4px_rgba(56,189,248,0.5)] hover:bg-skyblue/90 hover:shadow-[0_8px_20px_-4px_rgba(56,189,248,0.6)]",
        outline: "border-white/10 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 hover:border-white/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-white/5 hover:text-skyblue",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-skyblue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 gap-2",
        xs: "h-7 px-3 text-xs gap-1.5",
        sm: "h-9 px-4 text-xs gap-1.5",
        lg: "h-14 px-10 text-base gap-2.5",
        icon: "size-11",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
