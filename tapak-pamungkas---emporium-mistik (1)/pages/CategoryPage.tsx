
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { getProductsByCategory } from '../data/products';
import { Product, ProductCategory } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { SLUGS_TO_CATEGORIES, STORE_NAME, PRODUCTS_PER_PAGE } from '../constants';
import { Button } from '../components/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '../components/ui/Icon';

const sortOptions = [
  { value: 'default', label: 'Urutan Standar' },
  { value: 'price-asc', label: 'Harga: Terendah ke Tertinggi' },
  { value: 'price-desc', label: 'Harga: Tertinggi ke Terendah' },
  { value: 'name-asc', label: 'Nama: A ke Z' },
  { value: 'name-desc', label: 'Nama: Z ke A' },
];

export const CategoryPage: React.FC = () => {
  const { categoryName: categorySlug } = useParams<{ categoryName: string }>();
  const [allProductsForCategory, setAllProductsForCategory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDisplayName, setCategoryDisplayName] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    if (categorySlug) {
      setIsLoading(true); 
      setCurrentPage(1); 
      setSortOrder('default'); // Reset sort order on category change

      const mappedCategoryName = SLUGS_TO_CATEGORIES[categorySlug];
      if (mappedCategoryName) {
        const category = mappedCategoryName as ProductCategory;
        setCategoryDisplayName(category);
        document.title = `Koleksi ${category} | ${STORE_NAME}`;
        
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

  const sortedProducts = useMemo(() => {
    let productsToSort = [...allProductsForCategory];
    switch (sortOrder) {
      case 'price-asc':
        productsToSort.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        productsToSort.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        productsToSort.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        productsToSort.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'default' uses the original order from getProductsByCategory
        break;
    }
    return productsToSort;
  }, [allProductsForCategory, sortOrder]);

  // Reset current page to 1 when sortOrder changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder]);


  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProductsToDisplay = sortedProducts.slice(startIndex, endIndex);

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
      <SectionTitle 
        title={categoryDisplayName} 
        subtitle={allProductsForCategory.length > 0 ? `Ada ${allProductsForCategory.length} barang di kategori ini. Halaman ${currentPage} dari ${totalPages || 1}` : `Telusuri koleksi ${categoryDisplayName.toLowerCase()} kita!`}
      />

      {allProductsForCategory.length > 0 && (
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="text-sm text-text-secondary">
            Menampilkan {currentProductsToDisplay.length} dari {sortedProducts.length} produk.
           </div>
           <div className="flex items-center space-x-2">
            <label htmlFor="sort-order" className="text-sm font-medium text-text-secondary whitespace-nowrap">
              Urutkan:
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-brand-secondary/50 border border-brand-secondary text-text-primary text-sm rounded-lg focus:ring-brand-accent focus:border-brand-accent p-2.5 w-full sm:w-auto"
              aria-label="Urutkan produk"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      {allProductsForCategory.length === 0 ? (
         <div className="text-center py-10">
            <SparklesIcon className="w-16 h-16 mx-auto text-brand-accent mb-4" />
            <p className="text-xl text-text-secondary">Yah, barangnya lagi kosong nih di kategori ini.</p>
            <p className="text-text-secondary mt-2">Coba cek lagi nanti atau lihat kategori lainnya ya!</p>
            <Link to="/" className="mt-6 inline-block">
                <Button variant="outline">Lihat Semua Kategori</Button>
            </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProductsToDisplay.map(product => (
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
                aria-label="Halaman sebelumnya"
              >
                Sebelumnya
              </Button>
              <span className="text-text-secondary font-medium" aria-live="polite" aria-atomic="true">
                Hal {currentPage} / {totalPages}
              </span>
              <Button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                variant="outline"
                size="md"
                rightIcon={<ChevronRightIcon className="h-5 w-5" />}
                aria-label="Halaman berikutnya"
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
