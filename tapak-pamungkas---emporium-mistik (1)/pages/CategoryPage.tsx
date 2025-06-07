
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { getProductsByCategory } from '../data/products';
import { Product, ProductCategory } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { SLUGS_TO_CATEGORIES, STORE_NAME, PRODUCTS_PER_PAGE } from '../constants';
import { Button } from '../components/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/ui/Icon';

export const CategoryPage: React.FC = () => {
  const { categoryName: categorySlug } = useParams<{ categoryName: string }>();
  const [allProductsForCategory, setAllProductsForCategory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDisplayName, setCategoryDisplayName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (categorySlug) {
      setIsLoading(true); 
      setCurrentPage(1); 

      const mappedCategoryName = SLUGS_TO_CATEGORIES[categorySlug];
      if (mappedCategoryName) {
        const category = mappedCategoryName as ProductCategory;
        setCategoryDisplayName(category);
        document.title = `Koleksi ${category} | ${STORE_NAME}`;
        
        // Directly set products and loading state
        setAllProductsForCategory(getProductsByCategory(category));
        setIsLoading(false);
      } else {
        setCategoryDisplayName('Kategori Gak Ketemu Nih');
        setAllProductsForCategory([]);
        setIsLoading(false);
        document.title = `Kategori Gak Ada | ${STORE_NAME}`;
      }
    }
  }, [categorySlug]);

  // Pagination logic
  const totalPages = Math.ceil(allProductsForCategory.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = allProductsForCategory.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner size="lg" /></div>;
  }
  
  if (!categoryDisplayName || categoryDisplayName === 'Kategori Gak Ketemu Nih') {
    return (
      <AnimatedSection className="text-center py-20">
        <SectionTitle title="Waduh, Kategori Gak Ada" />
        <p className="text-text-secondary mb-8">Kategori yang kamu cari kayaknya gak ada atau udah pindah tempat nih.</p>
        <Link to="/">
          <Button variant="primary">Balik ke Beranda Aja Yuk</Button>
        </Link>
      </AnimatedSection>
    );
  }


  return (
    <AnimatedSection>
      <SectionTitle title={categoryDisplayName} subtitle={`Cek koleksi ${categoryDisplayName.toLowerCase()} kita yang keren-keren ini! Halaman ${currentPage} dari ${totalPages || 1}`} />
      {allProductsForCategory.length === 0 ? (
        <p className="text-center text-text-secondary text-lg">Yah, barangnya lagi kosong nih di kategori ini. Coba cek lagi nanti ya!</p>
      ) : (
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
