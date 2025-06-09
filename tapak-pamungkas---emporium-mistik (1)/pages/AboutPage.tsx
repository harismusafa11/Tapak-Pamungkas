
import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { STORE_NAME } from '../constants';
import { SparklesIcon } from '../components/ui/Icon';

export const AboutPage: React.FC = () => {
  React.useEffect(() => {
    document.title = `Tentang Kita | ${STORE_NAME}`;
  }, []);

  return (
    <AnimatedSection className="space-y-12">
      <SectionTitle title={`Kenalan Yuk Sama ${STORE_NAME}!`} subtitle="Ngebuka Jalan ke Dunia Penuh Misteri" />

      <div className="max-w-3xl mx-auto bg-brand-secondary/10 p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-8">
            <img src={`https://i.ibb.co/XxpzTXQk/logotp.png`} alt={`Toko ${STORE_NAME} kita`} className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-brand-accent"/>
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-accent mb-6 text-center">Misi Kita Nih</h2>
        <p className="text-text-primary leading-relaxed mb-4">
          Di {STORE_NAME}, kita percaya kalau batas antara dunia kita sama dunia 'sebelah' itu tipis banget, gak semua orang sadar. Misi kita itu simpel: ngasih kamu, para pencari, pelajar, dan praktisi, alat-alat dan ilmu asli buat menjelajah luasnya dunia mistik dan esoteris. Kita pengen banget ngumpulin koleksi yang bisa bikin kamu takjub, makin ngerti, dan jadi pribadi yang lebih baik.
        </p>
        <p className="text-text-primary leading-relaxed mb-4">
          Nama "{STORE_NAME}" itu artinya "Jejak Terakhir" atau "Langkah Pamungkas" gitu. Keren kan? Ini nunjukkin perjalanan buat nemuin kebijaksanaan yang dalem banget, dan juga ilmu kuno turun-temurun yang kita jaga dan pengen bagiin ke kamu semua.
        </p>
        
        <div className="mt-8 border-t border-brand-secondary/50 pt-6">
            <h3 className="text-2xl font-serif font-semibold text-text-primary mb-4 text-center">Apa Aja Sih yang Ada di Sini?</h3>
            <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                    <SparklesIcon className="w-5 h-5 mr-3 mt-1 text-brand-accent flex-shrink-0"/>
                    <span><strong>Ilmu Gaib:</strong> Buku-buku kuno, catatan sakti (grimoire), dan bahan belajar pilihan yang ngebuka rahasia ilmu kuno dan praktik esoteris.</span>
                </li>
                <li className="flex items-start">
                    <SparklesIcon className="w-5 h-5 mr-3 mt-1 text-brand-accent flex-shrink-0"/>
                    <span><strong>Barang Bertuah:</strong> Benda-benda pusaka, jimat, kristal, sama alat buat ngeramal yang asli dan punya 'isi' unik masing-masing.</span>
                </li>
                <li className="flex items-start">
                    <SparklesIcon className="w-5 h-5 mr-3 mt-1 text-brand-accent flex-shrink-0"/>
                    <span><strong>Panduan & Teman Ngobrol:</strong> Walaupun ordernya via WhatsApp, kita pengen banget bangun komunitas buat orang-orang yang sefrekuensi di jalur spiritualnya. Jadi, jangan ragu buat ngobrol ya!</span>
                </li>
            </ul>
        </div>

        <p className="text-text-primary leading-relaxed mt-8 text-center">
          Yuk, kepoin koleksi kita dan mulai petualangan unikmu sendiri ke dunia mistik. Semoga perjalananmu seru dan mencerahkan!
        </p>
      </div>
    </AnimatedSection>
  );
};
