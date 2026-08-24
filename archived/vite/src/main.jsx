import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

// Gate the entrance on JS being alive. Without this class the reveal styles
// never apply, so a blocked bundle degrades to a fully readable page.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
