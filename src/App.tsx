import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { ModalProvider } from './contexts/ModalContext'
import './index.css'
import { AppRouter } from './routes'
function App() {

  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <ModalProvider>
          <AppRouter />
        </ModalProvider>
      </AuthProvider>
    
    </>
  )
}

export default App
