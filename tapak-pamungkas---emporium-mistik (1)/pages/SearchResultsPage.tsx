
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { searchProducts } from '../data/products';
import { Product } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { STORE_NAME, PRODUCTS_PER_PAGE } from '../constants';
import { Button } from '../components/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '../components/ui/Icon';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page on new search
    
    // Simulate loading delay for better UX, can be removed if searchProducts is very fast
    const timer = setTimeout(() => {
      const results = searchProducts(query);
      setFoundProducts(results);
      setIsLoading(false);
      document.title = `Hasil Cari: "${query}" | ${STORE_NAME}`;
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup timer on unmount or query change

  }, [query]);

  // Pagination logic
  const totalPages = Math.ceil(foundProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = foundProducts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <AnimatedSection>
      <SectionTitle 
        title={query ? `Hasil Cari Buat: "${query}"` : "Cari Produk Apa Nih?"} 
        subtitle={query && foundProducts.length > 0 ? `Kita nemu ${foundProducts.length} barang yang cocok. Halaman ${currentPage} dari ${totalPages || 1}` : ''}
      />
      
      {!query && (
        <div className="text-center py-10">
          <SearchIcon className="w-16 h-16 mx-auto text-brand-accent mb-4" />
          <p className="text-xl text-text-secondary">Ketik aja mau cari barang apa di kotak pencarian di atas ya.</p>
        </div>
      )}

      {query && foundProducts.length === 0 && (
        <div className="text-center py-10">
            <SearchIcon className="w-16 h-16 mx-auto text-brand-accent mb-4" />
          <p className="text-xl text-text-secondary">Yah, buat kata kunci <span className="font-semibold text-brand-accent">"{query}"</span> kayaknya gak ada yang cocok nih.</p>
          <p className="text-text-secondary mt-2">Coba pake kata kunci lain yang lebih umum atau cek ejaannya lagi ya.</p>
          <Link to="/" className="mt-6 inline-block">
            <Button variant="outline">Balik ke Beranda</Button>
          </Link>
        </div>
      )}

      {query && foundProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-4">
              <Button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                variant="outline"
                size="md"
                leftIcon={<ChevronLeftIcon className="h-5 w-5" />}
              >
                Sebelumnya
              </Button>
              <span className="text-text-secondary font-medium">
                Hal {currentPage} / {totalPages}
              </span>
              <Button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                variant="outline"
                size="md"
                rightIcon={<ChevronRightIcon className="h-5 w-5" />}
              >
                Berikutnya
              </Button>
            </div>
          )}
        </>
      )}
    </AnimatedSection>
  );
};