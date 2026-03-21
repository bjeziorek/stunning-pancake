import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme, ThemePanel } from '@radix-ui/themes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
      <App />
      <ThemePanel />
    </Theme>
  </StrictMode>,
)
