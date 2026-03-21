import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom'
import "./i18n/i18n.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <BrowserRouter>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">

      <Toaster />
      <ThemePanel />

      <App />
    </Theme>
    </BrowserRouter>
  </StrictMode>,
)
