import { FiUploadCloud } from 'react-icons/fi'

export function Title() {
  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <FiUploadCloud className="text-zinc-400" />
      <span>Upload files</span>
    </div>
  )
}
