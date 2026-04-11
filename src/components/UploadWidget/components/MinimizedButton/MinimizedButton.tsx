import * as Collapsible from '@radix-ui/react-collapsible'
import { LuMaximize2 } from 'react-icons/lu'

const stylesheet = {
  trigger:
    'group w-full bg-white/2 py-3 px-5 flex items-center justify-between',
  icon: 'text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200 cursor-pointer',
}

export function MinimizedButton() {
  return (
    <Collapsible.Trigger className={stylesheet.trigger}>
      <span>Upload files</span>
      <LuMaximize2 className={stylesheet.icon} />
    </Collapsible.Trigger>
  )
}
