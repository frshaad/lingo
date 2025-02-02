import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'focus-visible:Ghost-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold text-sm uppercase tracking-wide transition-colors focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-2 border-slate-200 border-b-4 bg-white text-black text-slate-500 hover:bg-slate-100 active:border-b-2',
        ghost:
          'border-0 border-transparent bg-transparent text-slate-500 hover:bg-slate-100',
        primary:
          'border-sky-500 border-b-4 bg-sky-400 text-primary-foreground hover:bg-sky-400/90 active:border-b-0',
        primaryGhost: 'bg-white text-sky-500 hover:bg-slate-100',
        secondary:
          'border-green-600 border-b-4 bg-green-500 text-primary-foreground hover:bg-green-500/90 active:border-b-0',
        secondaryGhost: 'bg-white text-green-500 hover:bg-slate-100',
        danger:
          'border-rose-600 border-b-4 bg-rose-500 text-primary-foreground hover:bg-rose-500/90 active:border-b-0',
        dangerGhost: 'bg-white text-rose-500 hover:bg-slate-100',
        super:
          'border-indigo-600 border-b-4 bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 active:border-b-0',
        superGhost: 'bg-white text-indigo-500 hover:bg-slate-100',
        sidebar:
          'border-2 border-transparent bg-transparent text-slate-500 transition-none hover:bg-slate-100',
        sidebarGhost:
          'border-2 border-sky-300 bg-sky-500/15 text-sky-500 transition-none hover:bg-sky-500/20',
        locked:
          'border-neutral-400 border-b-4 bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 active:border-b-0',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
        icon: 'size-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
