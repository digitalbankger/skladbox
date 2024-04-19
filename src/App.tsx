import {Route, Routes, useLocation} from 'react-router-dom'
import { GeneralPage } from './pages/GeneralPage'
import { Catalog } from './pages/Catalog'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import './App.css';
import { ShopCartProvider } from './context/Catalog-context'
import { useEffect } from 'react'
import { Contact } from './pages/Contact'
import { AboutPage } from './pages/AboutPage'
import { AnimatePresence } from 'framer-motion'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
    <AnimatePresence>
    <ShopCartProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<GeneralPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </ShopCartProvider>
    </AnimatePresence>
    </>
  )
}

export default App;
