import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer active:bg-zinc-700',
  variants: {
    size: {
      default: 'px-3 py-2',
      icon: 'p-2',
      'icon-sm': 'p-1',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ size, asChild, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component className={buttonVariants({ size, className })} {...props} />
  )
}
