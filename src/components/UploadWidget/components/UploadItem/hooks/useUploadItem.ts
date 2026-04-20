import { FiRefreshCcw } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import { IoMdClose, IoMdLink } from 'react-icons/io'
import type { UploadWithId } from '../../../../../models/uploadWithId'
import {
  type Upload,
  UploadStatus,
  usePendingUploads,
  useUploads,
} from '../../../../../store/uploads'
import { calculateProgress } from '../../../../../utils/calculateProgress'
import { downloadUrl } from '../../../../../utils/dowloadUrl'

export function useUploadItem(uploadWithId: UploadWithId) {
  const cancelUpload = useUploads(state => state.cancelUpload)
  const retryUpload = useUploads(state => state.retryUpload)
  const { globalPercentage } = usePendingUploads()

  const buttonsData = [
    {
      icon: HiOutlineDownload,
      ariaLabel: 'Download compressed image',
      isDisplayed: true,
      onClick: () => downloadUrl(uploadWithId.remoteUrl ?? ''),
      isDisabled: uploadWithId.status !== UploadStatus.SUCCESS,
    },
    {
      icon: IoMdLink,
      ariaLabel: 'Copy remote url',
      isDisplayed: true,
      onClick: () =>
        navigator.clipboard.writeText(uploadWithId.remoteUrl ?? ''),
      isDisabled: !uploadWithId.remoteUrl,
    },
    {
      icon: FiRefreshCcw,
      ariaLabel: 'Retry upload',
      isDisplayed: true,
      onClick: () => retryUpload(uploadWithId.uploadId),
      isDisabled: ![UploadStatus.CANCELED, UploadStatus.ERROR].includes(
        uploadWithId.status,
      ),
    },
    {
      icon: IoMdClose,
      ariaLabel: 'Cancel Upload',
      isDisplayed: true,
      onClick: () => cancelUpload(uploadWithId.uploadId),
      isDisabled: uploadWithId.status !== UploadStatus.PROGRESS,
    },
  ]

  type StatusDisplay = {
    label: string
    className?: string
  }

  const UPLOAD_STATUS_DISPLAY: Record<
    UploadStatus,
    (upload: Upload) => StatusDisplay
  > = {
    [UploadStatus.PROGRESS]: () => ({
      label: `${globalPercentage}%`,
    }),
    [UploadStatus.ERROR]: () => ({
      label: 'Error',
      className: 'text-red-400',
    }),
    [UploadStatus.CANCELED]: () => ({
      label: 'Canceled',
      className: 'text-amber-500',
    }),
    [UploadStatus.SUCCESS]: () => ({
      label: 'Success!',
      className: 'text-green-500',
    }),
  }

  const progress = calculateProgress(
    uploadWithId.uploadSizeInBytes,
    uploadWithId.compressedSizeInBytes,
  )

  return { buttonsData, UPLOAD_STATUS_DISPLAY, progress }
}
