import { motion, type Variants } from 'motion/react'
import { useUploads } from '../../../../store/uploads'
import { UploadItem } from '../UploadItem/UploadItem'

const stylesheet = {
  container: 'px-3 flex flex-col gap-3',
  noUploadsSpan: 'text-sm text-zinc-400',
  listMap: 'flex flex-col gap-2 h-[200px] overflow-x-auto',
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
      <div className={stylesheet.listMap}>
        {Array.from(uploads.entries()).map(([uploadId, upload]) => (
          <UploadItem key={uploadId} upload={upload} uploadId={uploadId} />
        ))}
      </div>
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
