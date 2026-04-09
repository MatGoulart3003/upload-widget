import { Dropzone } from './components/Dropzone/Dropzone'
import { Header } from './components/Header/Header'
import { List } from './components/List/List'

const stylesheet = {
  container:
    'bg-zinc-900 max-w-90 rounded-xl shadow-shape w-full overflow-hidden',
  content: 'flex flex-col gap-3 py-2',
  divider: 'h-px bg-zinc-800 border-t border-black/50 box-content',
}

export function UploadWidget() {
  return (
    <div className={stylesheet.container}>
      <Header />
      <div className={stylesheet.content}>
        <Dropzone />
        <div className={stylesheet.divider} />
        <List />
      </div>
    </div>
  )
}
