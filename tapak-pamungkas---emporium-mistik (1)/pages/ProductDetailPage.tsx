
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { Product } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ImageSlider } from '../components/products/ImageSlider';
import { Button } from '../components/ui/Button';
import { WHATSAPP_NUMBER, STORE_NAME, CATEGORIES_SLUGS } from '../constants';
import { WhatsAppIcon, TagIcon, CubeIcon, AcademicCapIcon, SparklesIcon } from '../components/ui/Icon';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { SectionTitle } from '../components/common/SectionTitle';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      // Simulate API call
      setTimeout(() => {
        const fetchedProduct = getProductById(productId);
        setProduct(fetchedProduct || null);
        setIsLoading(false);
        if (fetchedProduct) {
          document.title = `${fetchedProduct.name} | ${STORE_NAME}`;
        } else {
          document.title = `Produk Gak Ketemu | ${STORE_NAME}`;
        }
      }, 500);
    }
  }, [productId]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><LoadingSpinner size="lg" /></div>;
  }

  if (!product) {
    return (
      <AnimatedSection className="text-center py-20">
         <SectionTitle title="Yah, Produknya Gak Ketemu" />
        <p className="text-text-secondary mb-8">Barang yang kamu cari kayaknya gak ada atau udah kita hapus nih.</p>
        <Link to="/">
          <Button variant="primary">Balik ke Beranda Aja Yuk</Button>
        </Link>
      </AnimatedSection>
    );
  }

  const whatsappMessage = `Halo ${STORE_NAME}, aku naksir nih sama produk ini: ${product.name} (ID: ${product.id}). Mau tanya-tanya dong!`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatedSection className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image Slider */}
        <div className="md:sticky md:top-24"> {/* Sticky for larger screens */}
          <ImageSlider images={product.images} altText={product.name} />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <Link 
            to={`/category/${CATEGORIES_SLUGS[product.category]}`} 
            className="text-sm text-brand-accent hover:underline flex items-center"
          >
            {product.category === "Pengetahuan Mistik" ? <AcademicCapIcon className="w-4 h-4 mr-1" /> : <SparklesIcon className="w-4 h-4 mr-1" />}
            {product.category}
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-text-primary font-serif">{product.name}</h1>
          
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-bold text-brand-accent">Rp{product.price.toLocaleString('id-ID')}</span>
            {product.stock > 0 ? (
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${product.stock < 10 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                {product.stock < 10 && product.stock > 0 ? `Stok Tipis (sisa ${product.stock}!)` : `Masih Ada ${product.stock} Stok`}
              </span>
            ) : (
              <span className="text-sm font-semibold bg-red-500/20 text-red-400 px-3 py-1 rounded-full">Barangnya Habis :(</span>
            )}
          </div>

          <p className="text-text-secondary leading-relaxed text-lg">{product.description}</p>
          
          <div className="border-t border-b border-brand-secondary/50 py-6 my-6 space-y-4">
            <h3 className="text-xl font-semibold text-text-primary mb-3 font-serif">Info Lengkap Barangnya Nih:</h3>
            <p className="text-text-primary whitespace-pre-wrap leading-relaxed">{product.detailedDescription}</p>
            
            {product.material && (
              <div className="flex items-center text-sm text-text-secondary">
                <CubeIcon className="w-5 h-5 mr-2 text-brand-accent" />
                <strong>Bahannya:</strong>&nbsp;{product.material}
              </div>
            )}
            {product.dimensions && (
              <div className="flex items-center text-sm text-text-secondary">
                <TagIcon className="w-5 h-5 mr-2 text-brand-accent" />
                <strong>Ukurannya:</strong>&nbsp;{product.dimensions}
              </div>
            )}
             {product.origin && (
              <div className="flex items-center text-sm text-text-secondary">
                <SparklesIcon className="w-5 h-5 mr-2 text-brand-accent" />
                <strong>Asalnya:</strong>&nbsp;{product.origin}
              </div>
            )}
          </div>

          {product.stock > 0 ? (
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" fullWidth leftIcon={<WhatsAppIcon className="h-6 w-6" />}>
                Pesan via WhatsApp Yuk!
              </Button>
            </a>
          ) : (
            <Button variant="secondary" size="lg" fullWidth disabled>
              Yah, Stoknya Habis
            </Button>
          )}
          <p className="text-xs text-text-secondary text-center mt-2">
            FYI: Ordernya langsung lewat WhatsApp ya, biar ngobrolnya lebih enak dan personal!
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};
