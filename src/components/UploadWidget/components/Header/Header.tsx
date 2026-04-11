import * as Collapsable from '@radix-ui/react-collapsible'
import { LuMinimize2 } from 'react-icons/lu'

const stylesheet = {
  container:
    'w-full p-4 py-2 text-small font-medium bg-white/2 border-zinc-800 border-b flex items-center justify-between',
  button:
    'text-zinc-400 hover:text-zinc-200 p-2 transition-colors -mr-2 cursor-pointer',
}

export function Header() {
  return (
    <div className={stylesheet.container}>
      <span>Upload files</span>
      <Collapsable.Trigger className={stylesheet.button}>
        <LuMinimize2 />
      </Collapsable.Trigger>
    </div>
  )
}
