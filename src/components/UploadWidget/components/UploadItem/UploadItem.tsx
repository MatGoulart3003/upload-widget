import { LuImageUp } from 'react-icons/lu'
import { Button } from '../../../ui/Button/Button'
import { useUploadItem } from './hooks/useUploadItem'
import * as Progress from '@radix-ui/react-progress'

interface UploadItemProps {
  fileName: string
  fileSize: string
  compressedSize: string
  compressionRatio: string
  progress: string
}

const stylesheet = {
  container:
    'p-3 rounded-lg flex flex-col gap-3 shadows-shape-content bg-white/2 relative overflow-hidden',
  fileName: 'text-xs font-medium flex items-center gap-1',
  icon: 'text-zinc-300',
  fileDescription: 'text-xxs text-zinc-400 flex gap-1.5 items-center',
  dot: 'size-1 rounded-full bg-zinc-700',
  fileSize: 'line-through',
  buttonsSection: 'absolute top-2.5 right-2.5 flex items-center gap-1',
  progressRatio: 'text-green-400 ml-1',
  accessibilityText: 'sr-only',
  progress: 'bg-zinc-800 rounded-full h-1 overflow-hidden',
  progressFill: 'bg-indigo-500 h-1',
  infoContainer: 'gap-1 flex flex-col',
}

export function UploadItem({
  fileName,
  fileSize,
  compressedSize,
  compressionRatio,
  progress,
}: UploadItemProps) {
  const { buttonsData } = useUploadItem()

  return (
    <div className={stylesheet.container}>
      <div className={stylesheet.infoContainer}>
        <div className={stylesheet.fileName}>
          <LuImageUp className={stylesheet.icon} />
          <span>{fileName}</span>
        </div>
        <span className={stylesheet.fileDescription}>
          <span className={stylesheet.fileSize}>{fileSize}</span>
          <div className={stylesheet.dot} />
          <span>
            {compressedSize}
            <span className={stylesheet.progressRatio}>{compressionRatio}</span>
          </span>
          <div className={stylesheet.dot} />
          <span>{progress}</span>
        </span>
      </div>

      <Progress.Root className={stylesheet.progress}>
        <Progress.Indicator
          className={stylesheet.progressFill}
          style={{ width: progress }}
        />
      </Progress.Root>

      <div className={stylesheet.buttonsSection}>
        {buttonsData.map(button =>
          button.isDisplayed ? (
            <Button key={button.ariaLabel} size="icon-sm">
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
