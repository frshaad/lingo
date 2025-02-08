import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-2 border-b-4 border-slate-200 bg-white text-slate-500 hover:bg-slate-100 active:border-b-2',
        ghost:
          'border-0 border-transparent bg-transparent text-slate-500 hover:bg-slate-100',
        primary:
          'border-b-4 border-sky-500 bg-sky-400 text-primary-foreground hover:bg-sky-400/90 active:border-b-0',
        primaryGhost: 'bg-white text-sky-500 hover:bg-slate-100',
        secondary:
          'border-b-4 border-green-600 bg-green-500 text-primary-foreground hover:bg-green-500/90 active:border-b-0',
        secondaryGhost: 'bg-white text-green-500 hover:bg-slate-100',
        danger:
          'border-b-4 border-rose-600 bg-rose-500 text-primary-foreground hover:bg-rose-500/90 active:border-b-0',
        dangerGhost: 'bg-white text-rose-500 hover:bg-slate-100',
        super:
          'border-b-4 border-indigo-600 bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 active:border-b-0',
        superGhost: 'bg-white text-indigo-500 hover:bg-slate-100',
        sidebar:
          'border-2 border-transparent bg-transparent text-slate-500 transition-none hover:bg-slate-100',
        sidebarGhost:
          'border-2 border-sky-300 bg-sky-500/15 text-sky-500 transition-none hover:bg-sky-500/20',
        locked:
          'border-b-4 border-neutral-400 bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 active:border-b-0',
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

export interface ButtonProperties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProperties>(
  ({ className, variant, size, asChild = false, ...properties }, reference) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={reference}
        {...properties}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
