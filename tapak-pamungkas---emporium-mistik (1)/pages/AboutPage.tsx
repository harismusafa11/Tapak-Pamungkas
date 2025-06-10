
import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { STORE_NAME } from '../constants';
// SparklesIcon removed as it's no longer used in this page

export const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = `Tentang Kita | ${STORE_NAME}`;
  }, []);

  return (
    <AnimatedSection className="space-y-12">
      <SectionTitle 
        title={`Kenalan Yuk Sama ${STORE_NAME}!`} 
        subtitle="Destinasi Pengijazahan Keilmuan & Benda Bertuah Otentik" 
      />

      <div className="max-w-3xl mx-auto bg-brand-secondary/10 p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-8">
            <img src={`https://i.ibb.co/XxpzTXQk/logotp.png`} alt={`Toko ${STORE_NAME} kita`} className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-brand-accent"/>
        </div>
        
        <p className="text-text-primary leading-relaxed mb-6 text-justify">
          Toko Tapak Pamungkas adalah destinasi utama bagi mereka yang mencari pengijazahan keilmuan yang terpercaya dan otentik. Kami menyediakan berbagai layanan pengijazahan yang didasarkan pada ilmu-ilmu spiritual yang telah teruji dan diakui keampuhannya. Dengan pendekatan yang profesional dan penuh tanggung jawab, kami memastikan setiap pelanggan mendapatkan pengalaman spiritual yang mendalam dan bermakna.
        </p>
        <p className="text-text-primary leading-relaxed mb-6 text-justify">
          Selain itu, Tapak Pamungkas juga dikenal sebagai tempat terpercaya untuk mendapatkan benda-benda bertuah yang memiliki super energi dan khodam. Setiap benda yang kami tawarkan telah melalui proses seleksi dan ritual khusus untuk memastikan keaslian dan kekuatan spiritualnya. Kami menyediakan berbagai macam benda bertuah, mulai dari cincin, kalung, hingga keris, yang semuanya dirancang untuk memberikan perlindungan, keberuntungan, dan kekuatan spiritual bagi pemiliknya.
        </p>
        <p className="text-text-primary leading-relaxed mt-8 text-center">
          Di Tapak Pamungkas, kami berkomitmen untuk memberikan pelayanan terbaik dan produk-produk berkualitas tinggi. Kunjungi kami dan temukan sendiri keajaiban spiritual yang dapat mengubah hidup Anda menjadi lebih baik dan bermakna.
        </p>
      </div>
    </AnimatedSection>
  );
};
