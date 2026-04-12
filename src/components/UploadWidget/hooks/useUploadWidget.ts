import { useCycle } from 'motion/react'

export const useUploadWidget = () => {
  const [isOpen, setIsOpen] = useCycle(false, true)

  return {
    isOpen,
    handleIsOpenChange: () => setIsOpen(),
  }
}
