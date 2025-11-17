import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import ProductsPage from './pages/ProductsPage.tsx'
import CartPage from './pages/CartPage.tsx'
import CartProvider from './context/CartContext.tsx'
import Header from './components/Header.tsx'

import './index.css'
import App from './App.tsx'
import CheckoutPage from './pages/CheckoutPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main style={{paddingTop: "40px"}}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
