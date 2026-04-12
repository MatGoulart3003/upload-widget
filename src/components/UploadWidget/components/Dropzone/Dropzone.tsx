import { useDropzone } from 'react-dropzone'
import CircularProgressBar from '../../../ui/CircularProgressBar/CircularProgressBar'

const stylesheet = {
  container: 'px-3 flex flex-col gap-3',
  dropZone:
    'cursor-pointer text-zinc-400 bg-black/20 rounded-lg p-5 border-zinc-700 border border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500/50 data-[active=true]:border data-[active=true]:text-indigo-400',
  dropFilesSpan: 'text-xs',
  clickToOpenSpan: 'text-sm underline',
  supportedFilesSpan: 'text-xs text-zinc-400',
  circularProgressContainer: 'flex flex-col items-center gap-2.5',
}

export function Dropzone() {
  const isThereAnyPendingUpload = true
  const uploadGlobalPercentage = 70

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      console.log(acceptedFiles)
    },
  })

  const renderDropZoneContent = () => {
    if (isThereAnyPendingUpload) {
      return (
        <div className={stylesheet.circularProgressContainer}>
          <CircularProgressBar
            progress={uploadGlobalPercentage}
            size={56}
            strokeWidth={4}
          />
          <span className="text-xs">Uploading 2 files...</span>
        </div>
      )
    }
    return (
      <>
        <span className={stylesheet.dropFilesSpan}>
          Drop the files here ...
        </span>

        <span className={stylesheet.clickToOpenSpan}>Click to open picker</span>
      </>
    )
  }
  return (
    <div className={stylesheet.container}>
      <div
        data-active={isDragActive}
        className={stylesheet.dropZone}
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />
        {renderDropZoneContent()}
      </div>
      <span className={stylesheet.supportedFilesSpan}>
        Only PNG and JPG files are supported.
      </span>
    </div>
  )
}
