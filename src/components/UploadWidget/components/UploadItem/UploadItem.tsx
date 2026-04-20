import * as Progress from '@radix-ui/react-progress'
import { LuImageUp } from 'react-icons/lu'
import { Tooltip } from 'react-tooltip'
import { type Upload, UploadStatus } from '../../../../store/uploads'
import { formatBytes } from '../../../../utils/formatBytes'
import { Button } from '../../../ui/Button/Button'
import { useUploadItem } from './hooks/useUploadItem'

interface UploadItemProps {
  upload: Upload
  uploadId: string
}

const stylesheet = {
  container:
    'p-3 border border-zinc-800 rounded-lg flex flex-col gap-3 shadows-shape-content bg-white/3 relative overflow-hidden min-h-[76px]',
  fileName: 'text-xs font-medium flex items-center gap-1',
  fileNameSpan: 'max-w-[180px] truncate',
  icon: 'text-zinc-300',
  fileDescription: 'text-xxs text-zinc-400 flex gap-1.5 items-center',
  dot: 'size-1 rounded-full bg-zinc-700',
  fileSize: 'line-through',
  buttonsSection: 'absolute top-2.5 right-2.5 flex items-center gap-1',
  progressRatio: 'text-green-400 ml-1',
  accessibilityText: 'sr-only',
  progress: 'group bg-zinc-800 rounded-full h-1 overflow-hidden',
  progressFill:
    'bg-indigo-500 h-1 group-data-[status=success]:bg-green-400 group-data-[status=error]:bg-red-400 group-data-[status=canceled]:bg-amber-500 transition-all',
  infoContainer: 'gap-1 flex flex-col',
}

export function UploadItem({ upload, uploadId }: UploadItemProps) {
  const { buttonsData, UPLOAD_STATUS_DISPLAY, progress } = useUploadItem({
    ...upload,
    uploadId,
  })

  function renderUploadStatus() {
    const resolver = UPLOAD_STATUS_DISPLAY[upload.status]
    if (!resolver) {
      return null
    }

    const { label, className } = resolver(upload)
    return <span className={className}>{label}</span>
  }

  return (
    <div className={stylesheet.container}>
      <div className={stylesheet.infoContainer}>
        <div className={stylesheet.fileName}>
          <LuImageUp className={stylesheet.icon} />
          <Tooltip id="my-tooltip" />
          <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content={upload.name}
            className={stylesheet.fileNameSpan}
          >
            {upload.name}
          </span>
        </div>
        <span className={stylesheet.fileDescription}>
          <span className={stylesheet.fileSize}>
            {formatBytes(upload.originalSizeIBytes)}
          </span>
          <div className={stylesheet.dot} />
          <span>
            {formatBytes(upload.compressedSizeInBytes ?? 0)}
            {upload.compressedSizeInBytes && (
              <span className={stylesheet.progressRatio}>
                -
                {Math.round(
                  ((upload.originalSizeIBytes - upload.compressedSizeInBytes) *
                    100) /
                    upload.originalSizeIBytes,
                )}
                %
              </span>
            )}
          </span>
          <div className={stylesheet.dot} />
          {renderUploadStatus()}
        </span>
      </div>

      <Progress.Root
        data-status={upload.status}
        className={stylesheet.progress}
      >
        <Progress.Indicator
          className={stylesheet.progressFill}
          style={{
            width:
              upload.status === UploadStatus.PROGRESS ? `${progress}%` : '100%',
          }}
        />
      </Progress.Root>

      <div className={stylesheet.buttonsSection}>
        {buttonsData.map(button =>
          button.isDisplayed ? (
            <Button
              onClick={button.onClick}
              key={button.ariaLabel}
              size="icon-sm"
              disabled={button.isDisabled}
            >
              <button.icon />
              <span className={stylesheet.accessibilityText}>
                {button.ariaLabel}
              </span>
            </Button>
          ) : null,
        )}
      </div>
    </div>
  )
}
