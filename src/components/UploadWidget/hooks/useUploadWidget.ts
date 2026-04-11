import { useState } from 'react'

export const useUploadWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleIsOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    onToggle,
    onOpen,
    handleIsOpenChange,
    onClose,
  }
}
