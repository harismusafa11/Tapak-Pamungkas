import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { getFeaturedProducts } from '../data/products';
import { Button } from '../components/ui/Button';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { SparklesIcon, AcademicCapIcon } from '../components/ui/Icon';
import { CATEGORIES_SLUGS, STORE_NAME } from '../constants';
import { ProductCategory, Testimonial } from '../types';
import { TestimonialCard } from '../components/testimonials/TestimonialCard';
import { getRecentTestimonials } from '../data/testimonials';


const CategoryShowcaseCard: React.FC<{ title: string; description: string; linkTo: string; icon: React.ReactNode }> = ({ title, description, linkTo, icon }) => (
  <AnimatedSection className="bg-brand-secondary/20 p-8 rounded-xl shadow-lg hover:shadow-brand-accent/20 transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="text-brand-accent mb-4">{icon}</div>
    <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">{title}</h3>
    <p className="text-text-secondary mb-6 text-sm flex-grow">{description}</p>
    <Link to={linkTo}>
      <Button variant="outline" size="md">Kepoin {title}</Button>
    </Link>
  </AnimatedSection>
);


export const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const recentTestimonials = getRecentTestimonials(3); // Get 3 recent testimonials

  React.useEffect(() => {
    document.title = `${STORE_NAME} - Emporium Mistik Seru!`;
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <AnimatedSection animationClass="animate-fade-in-down">
        <div 
          className="relative bg-cover bg-center py-24 md:py-40 rounded-xl shadow-2xl overflow-hidden" 
          style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1200/600')" }}
        >
          <div className="absolute inset-0 bg-brand-dark bg-opacity-70 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-accent mb-6 font-serif leading-tight animate-subtle-pulse">
              Halo! Selamat Datang di {STORE_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-text-primary mb-8 max-w-3xl mx-auto">
              Yuk, bongkar rahasia misteri! Temukan ilmu mistik langka & barang bertuah yang oke punya di sini.
            </p>
            <div className="space-x-4">
              <Link to={`/category/${CATEGORIES_SLUGS[ProductCategory.KEILMUAN_SPIRITUAL]}`}>
                <Button variant="primary" size="lg" leftIcon={<SparklesIcon className="h-5 w-5"/>}>
                  Lihat Koleksi Kerennya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Introduction Section */}
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto">
            <SectionTitle title="Ini Dia Kita!" subtitle={`Di ${STORE_NAME}, kita ini kayak jembatan antara dunia nyata sama dunia gaib. Kita punya barang-barang pilihan buat ngebantu perjalanan spiritualmu dan bikin praktekmu makin mantap.`} />
            <p className="text-text-secondary leading-relaxed">
            Semua barang di sini kita pilih satu-satu lho, energinya beda dan spesial, bisa ngebuka pemahaman yang lebih dalem. Nggak peduli kamu udah jago atau baru kepo, pasti ada aja harta karun buat nerangin jalanmu.
            </p>
        </div>
      </AnimatedSection>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <AnimatedSection>
          <SectionTitle title="Barang Jagoan Kita Nih!" subtitle="Ini dia pilihan barang kita yang paling dicari & paling mantap khasiatnya." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {featuredProducts.slice(0, 2).map(product => ( // Hanya menampilkan 2 produk pertama
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Categories Showcase Section */}
      <AnimatedSection>
        <SectionTitle title="Kepoin Dunia Kita Yuk!" subtitle="Cek koleksi spesial kita yang pas banget buat petualangan mistikmu." />
        <div className="grid md:grid-cols-2 gap-10">
          <CategoryShowcaseCard 
            title={ProductCategory.KEILMUAN_SPIRITUAL}
            description="Ilmu kuno, rahasia yang hampir hilang, dan panduan praktis buat nambah wawasan & nguasain ilmu gaib."
            linkTo={`/category/${CATEGORIES_SLUGS[ProductCategory.KEILMUAN_SPIRITUAL]}`}
            icon={<AcademicCapIcon className="w-16 h-16" />}
          />
          <CategoryShowcaseCard 
            title={ProductCategory.MEDIA_BERTUAH}
            description="Barang sakti, jimat pelindung, dan alat buat ngeramal, udah diisi energi khusus buat ngebantu kerjaan spiritualmu."
            linkTo={`/category/${CATEGORIES_SLUGS[ProductCategory.MEDIA_BERTUAH]}`}
            icon={<SparklesIcon className="w-16 h-16" />} 
          />
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      {recentTestimonials.length > 0 && (
        <AnimatedSection>
          <SectionTitle title="Kata Mereka yang Udah Nyobain!" subtitle="Dengerin cerita seru dari para pelanggan setia kita." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentTestimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Call to Action Section */}
      <AnimatedSection animationClass="animate-fade-in-up">
        <div className="bg-brand-secondary/30 p-10 md:p-16 rounded-xl shadow-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-accent font-serif mb-4">Udah Siap Mulai Petualanganmu?</h2>
          <p className="text-text-primary mb-8 max-w-xl mx-auto">
            Tiap orang punya jalannya sendiri buat nemuin pencerahan. Biar kita yang siapin alat tempurnya buat kamu!
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Ngobrol Sama Kita Yuk!
            </Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
};