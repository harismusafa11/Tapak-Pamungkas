import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { SparklesIcon, TagIcon, ShoppingCartIcon } from '../ui/Icon';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-brand-secondary/30 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-brand-accent/30 hover:-translate-y-2 flex flex-col h-full animate-fade-in-up">
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={product.images.length > 0 ? product.images[0] : `https://picsum.photos/seed/${product.id}/400`}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
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
        <div className="mt-auto flex gap-2">
            <Link to={`/product/${product.id}`} className="flex-grow">
                <Button variant="outline" fullWidth>
                Cek Detail
                </Button>
            </Link>
            <Button variant="primary" onClick={handleAddToCart} aria-label={`Tambah ${product.name} ke keranjang`}>
                <ShoppingCartIcon className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
};