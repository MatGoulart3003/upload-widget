import { useDropzone } from 'react-dropzone'

const stylesheet = {
  container: 'px-3 flex flex-col gap-3',
  dropZone:
    'cursor-pointer text-zinc-400 bg-black/20 rounded-lg p-5 border-zinc-700 border border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500/50 data-[active=true]:border data-[active=true]:text-indigo-400',
  dropFilesSpan: 'text-xs',
  clickToOpenSpan: 'text-sm underline',
  supportedFilesSpan: 'text-xs text-zinc-400',
}

export function Dropzone() {
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

  return (
    <div className={stylesheet.container}>
      <div
        data-active={isDragActive}
        className={stylesheet.dropZone}
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        <span className={stylesheet.dropFilesSpan}>
          Drop the files here ...
        </span>

        <span className={stylesheet.clickToOpenSpan}>Click to open picker</span>
      </div>
      <span className={stylesheet.supportedFilesSpan}>
        Only PNG and JPG files are supported.
      </span>
    </div>
  )
}
