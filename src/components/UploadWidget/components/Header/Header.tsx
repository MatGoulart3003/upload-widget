import { LuMinimize2 } from 'react-icons/lu'

const stylesheet = {
  container:
    'w-full p-4 py-2 text-small font-medium bg-white/2 border-zinc-800 border-b flex items-center justify-between',
  button:
    'p-2 rounded-lg hover:bg-white/10 transition ease-in-out cursor-pointer',
}

export function Header() {
  return (
    <div className={stylesheet.container}>
      <span>Upload files</span>
      <button className={stylesheet.button} type="button">
        <LuMinimize2 />
      </button>
    </div>
  )
}
