import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderSection } from './components/OrderSection';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { Sparkles } from 'lucide-react';

const Layout = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    toast 
  } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between text-[#18181B] selection:bg-[#C5A059]/30 selection:text-[#121212]">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className="bg-[#121212] text-[#FFFFFF] text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-[#C5A059]/40">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Header (Section 1 Announcement Bar + Section 2 Mobile Header) */}
      <Header />

      {/* Dynamic Route Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/admin" element={<AdminPanel onClose={() => setIsAdminOpen(false)} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<OrderSection />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Modals & Slide Drawers (No popups for About or Contact) */}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      <CartDrawer />

    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
