import { FiUploadCloud } from 'react-icons/fi'

const stylesheet = {
  container: 'flex items-center gap-1.5 text-sm font-medium',
  icon: 'text-zinc-400',
  uploadingTitle: 'flex items-baseline gap-1',
  percentage: 'text-xs text-zinc-400 tabular-nums',
}

export function Title() {
  const isThereAnyPendingUpload = true
  const uploadGlobalPercentage = 51

  const renderTitleContent = () => {
    if (isThereAnyPendingUpload) {
      return (
        <span className={stylesheet.uploadingTitle}>
          Uploading
          <span className={stylesheet.percentage}>
            {uploadGlobalPercentage}%
          </span>
        </span>
      )
    }
    return <span>Upload files</span>
  }

  return (
    <div className={stylesheet.container}>
      <FiUploadCloud className={stylesheet.icon} />
      {renderTitleContent()}
    </div>
  )
}
