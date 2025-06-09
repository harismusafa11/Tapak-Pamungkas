
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { SparklesIcon, TagIcon } from '../ui/Icon';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const initialImageSrc = product.images && product.images.length > 0 ? product.images[0] : '';
  const [currentImageSrc, setCurrentImageSrc] = useState<string>(initialImageSrc);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);

  useEffect(() => {
    const newInitialImageSrc = product.images && product.images.length > 0 ? product.images[0] : '';
    setCurrentImageSrc(newInitialImageSrc);
    setHasLoadError(false); // Reset error state when product changes
  }, [product]);

  const handleImageError = () => {
    if (currentImageSrc) { // Hanya log jika ada src awal yang gagal
      console.warn(`[ProductCard] Gagal memuat gambar: ${currentImageSrc} untuk produk "${product.name}" (ID: ${product.id})`);
    } else {
      console.warn(`[ProductCard] Tidak ada URL gambar utama untuk produk "${product.name}" (ID: ${product.id})`);
    }
    setHasLoadError(true);
  };

  const ImagePlaceholder: React.FC = () => (
    <div className="w-full h-full object-cover object-center bg-brand-secondary/50 flex flex-col items-center justify-center text-text-secondary p-4">
      <SparklesIcon className="w-12 h-12 mb-2 opacity-60" />
      <p className="text-xs text-center">Gambar tidak tersedia</p>
    </div>
  );

  return (
    <div className="bg-brand-secondary/30 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-brand-accent/30 hover:-translate-y-2 flex flex-col h-full animate-fade-in-up">
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative aspect-square w-full overflow-hidden">
          {hasLoadError || !currentImageSrc ? (
            <ImagePlaceholder />
          ) : (
            <img
              src={currentImageSrc}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
              loading="lazy"
            />
          )}
          {product.featured && (
             <div className="absolute top-3 right-3 bg-brand-accent text-brand-dark px-3 py-1 text-xs font-bold rounded-full flex items-center animate-subtle-pulse">
                <SparklesIcon className="w-4 h-4 mr-1" /> Jagoan!
             </div>
          )}
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-text-primary mb-2 font-serif group-hover:text-brand-accent transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-text-secondary mb-3 line-clamp-3 flex-grow">{product.description}</p>
        <div className="flex items-center text-brand-accent mb-4">
          <TagIcon className="w-5 h-5 mr-2" />
          <span className="text-2xl font-bold">Rp{product.price.toLocaleString('id-ID')}</span>
        </div>
        <div className="mt-auto">
          <Link to={`/product/${product.id}`}>
            <Button variant="outline" fullWidth>
              Cek Detailnya
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
