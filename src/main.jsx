import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext' // <-- penting!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>       {/* <-- WAJIB */}
      <App />
    </ThemeProvider>
  </StrictMode>
)
