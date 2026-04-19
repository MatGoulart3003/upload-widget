import { FiRefreshCcw } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import { IoMdClose, IoMdLink } from 'react-icons/io'
import type { UploadWithId } from '../../../../../models/uploadWithId'
import {
  type Upload,
  UploadStatus,
  useUploads,
} from '../../../../../store/uploads'

export function useUploadItem(UploadWithId: UploadWithId) {
  const cancelUpload = useUploads(state => state.cancelUpload)

  const buttonsData = [
    {
      icon: HiOutlineDownload,
      ariaLabel: 'Download compressed image',
      isDisplayed: true,
      onClick: undefined,
      isDisabled: UploadWithId.status !== UploadStatus.SUCCESS,
    },
    {
      icon: IoMdLink,
      ariaLabel: 'Copy remote url',
      isDisplayed: true,
      onClick: undefined,
      isDisabled: UploadWithId.status !== UploadStatus.SUCCESS,
    },
    {
      icon: FiRefreshCcw,
      ariaLabel: 'Retry upload',
      isDisplayed: true,
      onClick: undefined,
      isDisabled: ![UploadStatus.CANCELED, UploadStatus.ERROR].includes(
        UploadWithId.status,
      ),
    },
    {
      icon: IoMdClose,
      ariaLabel: 'Cancel Upload',
      isDisplayed: true,
      onClick: () => cancelUpload(UploadWithId.uploadId),
      isDisabled: UploadWithId.status !== UploadStatus.PROGRESS,
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
      label: `${45}%`,
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

  return { buttonsData, UPLOAD_STATUS_DISPLAY }
}
