import * as ScrollArea from '@radix-ui/react-scroll-area'
import { motion, type Variants } from 'motion/react'
import { useUploads } from '../../../../store/uploads'
import { UploadItem } from '../UploadItem/UploadItem'

const stylesheet = {
  container: 'px-3 flex flex-col gap-3',
  noUploadsSpan: 'text-sm text-zinc-400',
  listMap: 'flex flex-col gap-2',
}

const ANIMATION_VARIANTS = {
  open: { opacity: 1, transition: { duration: 0.5 } },
  closed: { opacity: 0 },
} as Variants

export function List() {
  const uploads = useUploads(store => store.uploads)

  const isUploadListEmpty = uploads.size === 0

  const renderUploadListContent = () => {
    if (isUploadListEmpty) {
      return <span className={stylesheet.noUploadsSpan}>No uploads added</span>
    }

    return (
      <ScrollArea.Root className="overflow-hidden">
        <ScrollArea.Viewport className="max-h-[220px]">
          <div className={stylesheet.listMap}>
            {Array.from(uploads.entries()).map(([uploadId, upload]) => (
              <UploadItem key={uploadId} upload={upload} uploadId={uploadId} />
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none rounded bg-zinc-800 p-0.5 transition-colors duration-160 ease-out hover:bg-zinc-900 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-zinc-600 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    )
  }

  return (
    <motion.div
      initial={'closed'}
      animate={'open'}
      variants={ANIMATION_VARIANTS}
      className={stylesheet.container}
    >
      <span>
        Uploaded files <span>{uploads.size}</span>
      </span>
      {renderUploadListContent()}
    </motion.div>
  )
}
