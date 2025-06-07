
import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 'testi001',
    name: 'Mas Bro Yoga',
    avatarUrl: `https://picsum.photos/seed/yoga/100/100`,
    rating: 5,
    title: 'Ilmunya Nggak Kaleng-Kaleng!',
    review: 'Baru baca Gulungan Rune Kuno aja udah berasa beda auranya. Penjelasannya juga gampang dicerna buat pemula kayak aku. Mantap jiwa, Tapak Pamungkas!',
    date: '15 Juli 2024',
  },
  {
    id: 'testi002',
    name: 'Mbak Ayu Spiritualis',
    avatarUrl: `https://picsum.photos/seed/ayu/100/100`,
    rating: 4,
    title: 'Amuletnya Bikin Adem Hati',
    review: 'Amulet Ketenangannya beneran bikin hati lebih plong. Desainnya juga cakep banget, keliatan berkelas. Pengiriman juga cepet, adminnya ramah pula. Next order lagi deh!',
    date: '28 Juli 2024',
  },
  {
    id: 'testi003',
    name: 'Kang Deden Kolektor',
    avatarUrl: `https://picsum.photos/seed/deden/100/100`,
    rating: 5,
    title: 'Bola Kristalnya TOP BGT!',
    review: 'Udah lama nyari Bola Kristal Penglihatan yang kualitasnya oke. Akhirnya nemu di sini. Bening banget, energinya juga kerasa kuat. Cocok buat nambah koleksi mistikku. Sukses terus buat Tapak Pamungkas!',
    date: '5 Agustus 2024',
  },
   {
    id: 'testi004',
    name: 'Sisca Si Peramal Tarot',
    avatarUrl: `https://picsum.photos/seed/sisca/100/100`,
    rating: 5,
    title: 'Dek Oracle-nya Ngomong Banget!',
    review: 'Dek Oracle Bisikan-nya ilustrasinya unik dan "ngena" banget. Udah coba beberapa tebaran, pesannya dalem dan relevan. Jadi alat bantu baru nih buat sesi ramalku. Thanks Tapak Pamungkas!',
    date: '12 Agustus 2024',
  },
];

export const getRecentTestimonials = (count: number = 3): Testimonial[] => {
  // For now, just return the first few. In a real app, sort by date.
  return testimonials.slice(0, count);
};
