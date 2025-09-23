import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRecommendedProducts } from '../data/products';
import { Product, ProductCategory } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ImageSlider } from '../components/products/ImageSlider';
import { Button } from '../components/ui/Button';
import { STORE_NAME, CATEGORIES_SLUGS } from '../constants';
import { WhatsAppIcon, TagIcon, CubeIcon, AcademicCapIcon, SparklesIcon, FacebookIcon, TwitterIcon, LinkIcon, ShoppingCartIcon } from '../components/ui/Icon';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { SectionTitle } from '../components/common/SectionTitle';
import { ImagePreviewModal } from '../components/ui/ImagePreviewModal';
import { ProductCard } from '../components/products/ProductCard';
import { useCart } from '../contexts/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [modalInitialImageIndex, setModalInitialImageIndex] = useState(0);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      setTimeout(() => {
        const fetchedProduct = getProductById(productId);
        setProduct(fetchedProduct || null);
        
        if (fetchedProduct) {
          document.title = `${fetchedProduct.name} | ${STORE_NAME}`;
          const recommendations = getRecommendedProducts(fetchedProduct.id, fetchedProduct.category, 3);
          setRecommendedProducts(recommendations);
        } else {
          document.title = `Produk Gak Ketemu | ${STORE_NAME}`;
          setRecommendedProducts([]);
        }
        setIsLoading(false);
        setIsAdded(false); // Reset added state on product change
      }, 500);
    }
  }, [productId]);
  
  const handleAddToCart = () => {
    if (product) {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000); // Show message for 2 seconds
    }
  };

  const openPreviewModal = (index: number) => {
    setModalInitialImageIndex(index);
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

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
  
  const productUrl = window.location.href;
  const shareTextBase = `Cek produk keren ini dari ${STORE_NAME}: ${product.name}`;
  const shareTextWhatsApp = `${shareTextBase} - ${productUrl}`;
  const shareTextTwitter = `Penasaran sama ${product.name} dari ${STORE_NAME}? Cek di sini:`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error('Gagal menyalin link:', err);
    }
  };

  return (
    <>
      <AnimatedSection className="container mx-auto py-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="md:sticky md:top-24">
            <ImageSlider 
              images={product.images} 
              altText={product.name} 
              onMainImageClick={openPreviewModal}
            />
             <p className="text-xs text-text-secondary text-center mt-2 italic">Klik gambar untuk memperbesar.</p>
          </div>

          <div className="space-y-6">
            <Link 
              to={`/category/${CATEGORIES_SLUGS[product.category]}`} 
              className="text-sm text-brand-accent hover:underline flex items-center"
            >
              {product.category === ProductCategory.KEILMUAN_SPIRITUAL ? <AcademicCapIcon className="w-4 h-4 mr-1" /> : <SparklesIcon className="w-4 h-4 mr-1" />}
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
                  <strong>Isi Paket:</strong>&nbsp;{product.material}
                </div>
              )}
              {product.dimensions && (
                <div className="flex items-center text-sm text-text-secondary">
                  <TagIcon className="w-5 h-5 mr-2 text-brand-accent" />
                  <strong>Ukurannya:</strong>&nbsp;{product.dimensions}
                </div>
              )}
            </div>

            {product.stock > 0 ? (
                <div className="flex flex-col items-center">
                    <Button variant="primary" size="lg" fullWidth leftIcon={<ShoppingCartIcon className="h-6 w-6" />} onClick={handleAddToCart}>
                        {isAdded ? "Berhasil Ditambahkan!" : "Tambah ke Keranjang"}
                    </Button>
                    {isAdded && <p className="text-green-400 text-sm mt-2 animate-fade-in-up">Produk sudah masuk keranjang.</p>}
                </div>
            ) : (
              <Button variant="secondary" size="lg" fullWidth disabled>
                Yah, Stoknya Habis
              </Button>
            )}
             <p className="text-xs text-text-secondary text-center mt-2">
                Kumpulkan barang di keranjang dulu, baru pesan semua sekaligus via WhatsApp!
            </p>

            <div className="pt-6 border-t border-brand-secondary/30 mt-6">
              <h4 className="text-md font-semibold text-text-primary mb-3">Bagikan Produk Ini:</h4>
              <div className="flex items-center space-x-3">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareTextWhatsApp)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-secondary/40 hover:bg-brand-secondary/70 rounded-lg transition-colors"
                  aria-label="Bagikan ke WhatsApp"
                  title="Bagikan ke WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5 text-green-500" />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-secondary/40 hover:bg-brand-secondary/70 rounded-lg transition-colors"
                  aria-label="Bagikan ke Facebook"
                  title="Bagikan ke Facebook"
                >
                  <FacebookIcon className="h-5 w-5 text-blue-600" />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareTextTwitter)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-brand-secondary/40 hover:bg-brand-secondary/70 rounded-lg transition-colors"
                  aria-label="Bagikan ke Twitter"
                  title="Bagikan ke Twitter"
                >
                  <TwitterIcon className="h-5 w-5 text-sky-500" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="p-3 bg-brand-secondary/40 hover:bg-brand-secondary/70 rounded-lg transition-colors relative"
                  aria-label="Salin link produk"
                  title="Salin Link Produk"
                >
                  <LinkIcon className="h-5 w-5 text-text-secondary" />
                </button>
                {isCopied && <span className="ml-2 text-sm text-brand-accent animate-fade-in-up">Link disalin!</span>}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {recommendedProducts.length > 0 && (
        <AnimatedSection className="container mx-auto py-12 mt-12 border-t border-brand-secondary/30">
          <SectionTitle title="Kamu Mungkin Suka Juga Nih!" subtitle="Produk lain yang mirip atau sering dilihat bareng yang ini." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map(recProduct => (
              <ProductCard key={recProduct.id} product={recProduct} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {product.images && product.images.length > 0 && (
        <ImagePreviewModal
          images={product.images}
          initialIndex={modalInitialImageIndex}
          isOpen={isPreviewModalOpen}
          onClose={closePreviewModal}
          productName={product.name}
        />
      )}
    </>
  );
};