import { CanceledError } from 'axios'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { useShallow } from 'zustand/shallow'
import { uploadFileToStorage } from '../service/uploadFIleToStorage.service'
import { calculateProgress } from '../utils/calculateProgress'

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

      if (!upload) return

      try {
        await uploadFileToStorage(
          {
            file: upload.file,
            onProgress(sizeInBytes) {
              updateUpload(uploadId, { uploadSizeInBytes: sizeInBytes })
            },
          },
          { signal: upload.abortController.signal },
        )

        updateUpload(uploadId, { status: UploadStatus.SUCCESS })
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
          acc.total += upload.originalSizeIBytes
          acc.uploaded += upload.uploadSizeInBytes
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
