import { FiRefreshCcw } from 'react-icons/fi'
import { HiOutlineDownload } from 'react-icons/hi'
import { IoMdClose, IoMdLink } from 'react-icons/io'

export function useUploadItem() {
  const buttonsData = [
    {
      icon: HiOutlineDownload,
      ariaLabel: 'Download compressed image',
      isDisplayed: true,
    },
    {
      icon: IoMdLink,
      ariaLabel: 'Copy remote url',
      isDisplayed: true,
    },
    {
      icon: FiRefreshCcw,
      ariaLabel: 'Retry upload',
      isDisplayed: true,
    },
    {
      icon: IoMdClose,
      ariaLabel: 'Cancel Upload',
      isDisplayed: true,
    },
  ]

  return { buttonsData }
}
