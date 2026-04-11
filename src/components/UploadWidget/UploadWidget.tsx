import * as Collapsible from '@radix-ui/react-collapsible'
import { Dropzone } from './components/Dropzone/Dropzone'
import { Header } from './components/Header/Header'
import { List } from './components/List/List'
import { useUploadWidget } from './hooks/useUploadWidget'
import { MinimizedButton } from './components/MinimizedButton/MinimizedButton'

const stylesheet = {
  container: 'bg-zinc-900 w-90 rounded-xl shadow-shape overflow-hidden',
  content: 'flex flex-col gap-3 py-2',
  divider: 'h-px bg-zinc-800 border-t border-black/50 box-content',
}

export function UploadWidget() {
  const { isOpen, handleIsOpenChange } = useUploadWidget()

  return (
    <Collapsible.Root onOpenChange={handleIsOpenChange}>
      <div className={stylesheet.container}>
        {!isOpen && <MinimizedButton />}
        <Collapsible.Content>
          <Header />
          <div className={stylesheet.content}>
            <Dropzone />
            <div className={stylesheet.divider} />
            <List />
          </div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  )
}
