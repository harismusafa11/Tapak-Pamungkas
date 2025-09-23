import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { KonsultanAiPage } from './pages/KonsultanAiPage';
import { CartProvider } from './contexts/CartContext';
import { CartPage } from './pages/CartPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/konsultan-ai" element={<KonsultanAiPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </HashRouter>
  );
};

export default App;