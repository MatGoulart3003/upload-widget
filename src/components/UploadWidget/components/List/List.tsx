import { UploadItem } from '../UploadItem/UploadItem'

const stylesheet = {
  container: 'px-3 flex flex-col gap-3',
  noUploadsSpan: 'text-sm text-zinc-400',
  listMap: 'flex flex-col gap-2',
}

export function List() {
  const isUploadListEmpty = false

  const renderUploadListContent = () => {
    if (isUploadListEmpty) {
      return <span className={stylesheet.noUploadsSpan}>No uploads added</span>
    }

    return (
      <div className={stylesheet.listMap}>
        <UploadItem
          fileName="image1.jpg"
          fileSize="1.2 MB"
          compressedSize="800 KB"
          compressionRatio="66.7%"
          progress="20%"
        />
        <UploadItem
          fileName="image2.png"
          fileSize="2.5 MB"
          compressedSize="1.1 MB"
          compressionRatio="44.0%"
          progress="90%"
        />
        <UploadItem
          fileName="image3.gif"
          fileSize="3.0 MB"
          compressedSize="1.8 MB"
          compressionRatio="60.0%"
          progress="50%"
        />
      </div>
    )
  }

  return (
    <div className={stylesheet.container}>
      <span>
        Uploaded files <span>{3}</span>
      </span>
      {renderUploadListContent()}
    </div>
  )
}
