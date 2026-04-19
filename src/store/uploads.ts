import { CanceledError } from 'axios'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/shallow'
import { uploadFileToStorage } from '../service/uploadFIleToStorage.service'
import { calculateProgress } from '../utils/calculateProgress'
import { compressImage } from '../utils/compressImage'

export enum UploadStatus {
  PROGRESS = 'progress',
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELED = 'canceled',
}

export interface Upload {
  name: string
  file: File
  abortController: AbortController
  status: UploadStatus
  originalSizeIBytes: number
  uploadSizeInBytes: number
  compressedSizeInBytes?: number
  remoteUrl?: string
}

type UploadState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
}

enableMapSet()

export const useUploads = create<UploadState, [['zustand/immer', never]]>(
  immer((set, get) => {
    function updateUpload(uploadId: string, changes: Partial<Upload>) {
      set(state => {
        const upload = state.uploads.get(uploadId)
        if (!upload) return
        Object.assign(upload, changes)
      })
    }

    async function processUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxHeight: 1000,
          maxWidth: 1000,
          quality: 0.8,
        })

        updateUpload(uploadId, { compressedSizeInBytes: compressedFile.size })

        const { url } = await uploadFileToStorage(
          {
            file: compressedFile,
            onProgress(sizeInBytes) {
              updateUpload(uploadId, { uploadSizeInBytes: sizeInBytes })
            },
          },
          { signal: upload.abortController.signal },
        )

        updateUpload(uploadId, { status: UploadStatus.SUCCESS, remoteUrl: url })
      } catch (error) {
        if (error instanceof CanceledError) {
          return
        }

        updateUpload(uploadId, { status: UploadStatus.ERROR })
        console.error(error)
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      upload.abortController.abort()

      updateUpload(uploadId, { status: UploadStatus.CANCELED })
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID()
        const abortController = new AbortController()

        const upload: Upload = {
          name: file.name,
          file,
          abortController,
          status: UploadStatus.PROGRESS,
          originalSizeIBytes: file.size,
          uploadSizeInBytes: 0,
        }

        set(state => {
          state.uploads.set(uploadId, upload)
        })

        processUpload(uploadId)
      }
    }

    return {
      addUploads,
      uploads: new Map(),
      cancelUpload,
    }
  }),
)

export const usePendingUploads = () => {
  return useUploads(
    useShallow(store => {
      const uploadValues = Array.from(store.uploads.values())

      const isThereAnyPendingUploads = uploadValues.some(
        upload => upload.status === UploadStatus.PROGRESS,
      )

      if (!isThereAnyPendingUploads) {
        return { isThereAnyPendingUploads, globalPercentage: 100 }
      }

      const { total, uploaded } = uploadValues.reduce(
        (acc, upload) => {
          if (upload.compressedSizeInBytes) {
            acc.uploaded += upload.uploadSizeInBytes
          }
          acc.total += upload.compressedSizeInBytes || upload.originalSizeIBytes

          return acc
        },
        {
          total: 0,
          uploaded: 0,
        },
      )

      const globalPercentage = calculateProgress(uploaded, total)

      return { globalPercentage, isThereAnyPendingUploads }
    }),
  )
}
