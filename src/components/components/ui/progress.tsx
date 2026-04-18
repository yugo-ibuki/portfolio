'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string
  indicatorStyle?: CSSProperties
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, indicatorClassName, indicatorStyle, value, ...props }, ref) => {
    const progressValue = typeof value === 'number' ? value : 0

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full flex-1 bg-primary transition-transform duration-500 ease-out motion-reduce:transition-none',
            indicatorClassName
          )}
          style={{
            transform: `translateX(-${100 - progressValue}%)`,
            ...indicatorStyle,
          }}
        />
      </ProgressPrimitive.Root>
    )
  }
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
