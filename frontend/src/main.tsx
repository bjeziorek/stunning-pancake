import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom'
import "./i18n/i18n.ts";
import { GatewayConnectionProvider } from './context/GatewayConnectionProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
   <GatewayConnectionProvider>
    <BrowserRouter>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
      <Toaster />
      <ThemePanel />
      <App />
    </Theme>
    </BrowserRouter>
    </GatewayConnectionProvider>
  </StrictMode>,
)
