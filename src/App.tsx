import { UploadWidget } from './components/UploadWidget/UploadWidget'
import 'react-tooltip/dist/react-tooltip.css'

const stylesheet = {
  main: 'h-dvh flex flex-col items-center justify-center p-4',
}

function App() {
  return (
    <main className={stylesheet.main}>
      <UploadWidget />
    </main>
  )
}

export default App
