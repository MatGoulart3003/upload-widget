import { FiUploadCloud } from 'react-icons/fi'
import { usePendingUploads } from '../../../../store/uploads'

const stylesheet = {
  container: 'flex items-center gap-1.5 text-sm font-medium',
  icon: 'text-zinc-400',
  uploadingTitle: 'flex items-baseline gap-1',
  percentage: 'text-xs text-zinc-400 tabular-nums',
}

export function Title() {
  const { isThereAnyPendingUploads, globalPercentage } = usePendingUploads()

  const renderTitleContent = () => {
    if (isThereAnyPendingUploads) {
      return (
        <span className={stylesheet.uploadingTitle}>
          Uploading
          <span className={stylesheet.percentage}>{globalPercentage}%</span>
        </span>
      )
    }
    return <span>Upload files Corinthians Paulista</span>
  }

  return (
    <div className={stylesheet.container}>
      <FiUploadCloud className={stylesheet.icon} />
      {renderTitleContent()}
    </div>
  )
}
