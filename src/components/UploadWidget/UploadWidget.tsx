import * as Collapsible from '@radix-ui/react-collapsible'
import { Dropzone } from './components/Dropzone/Dropzone'
import { Header } from './components/Header/Header'
import { List } from './components/List/List'
import { useUploadWidget } from './hooks/useUploadWidget'
import { MinimizedButton } from './components/MinimizedButton/MinimizedButton'
import { motion, type Variants } from 'motion/react'

const stylesheet = {
  container:
    'bg-zinc-900 overflow-hidden w-90 rounded-xl data-[state=open]:shadow-shape border border-transparent animate-border data-[state=closed]:rounded-3xl data-[state=closed]:data-[progress=false]:shadow-shape data-[state=closed]:data-[progress=true]:[background:linear-gradient(45deg,#09090B,var(--color-zinc-900)_50%,#09090B)_padding-box,conic-gradient(from_var(--border-angle),oklch(55.17%_0.014_285.95/.48)_80%,var(--color-indigo-500)_86%,var(--color-indigo-300)_90%,var(--color-indigo-500)_94%,oklch(55.17%_0.014_285.95/.48))_border-box]',
  content: 'flex flex-col gap-4 py-3',
  divider: 'h-px bg-zinc-800 border-t border-black/50 box-content',
}

const ANIMATION_VARIANTS = {
  closed: {
    width: 'max-content',
    height: 44,
    transition: {
      type: 'inertia',
    },
  },
  open: {
    height: 'auto',
    transition: {
      duration: 0.2,
    },
  },
} as Variants

export function UploadWidget() {
  const isThereAnyPendingUpload = true

  const { isOpen, handleIsOpenChange } = useUploadWidget()

  return (
    <Collapsible.Root onOpenChange={handleIsOpenChange} asChild>
      <motion.div
        data-progress={isThereAnyPendingUpload}
        animate={isOpen ? 'open' : 'closed'}
        variants={ANIMATION_VARIANTS}
        className={stylesheet.container}
      >
        {!isOpen && <MinimizedButton />}
        <Collapsible.Content>
          <Header />
          <div className={stylesheet.content}>
            <Dropzone />
            <div className={stylesheet.divider} />
            <List />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  )
}
