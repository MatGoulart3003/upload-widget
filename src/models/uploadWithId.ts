import type { Upload } from '../store/uploads'

export interface UploadWithId extends Upload {
  uploadId: string
}
