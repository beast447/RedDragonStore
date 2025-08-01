import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID ?? "", currency: "USD" }}>
          <App />
        </PayPalScriptProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
