
import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 'testi001',
    name: 'Andi K',
    avatarUrl: `https://picsum.photos/seed/yoga/100/100`,
    rating: 5,
    title: 'Ilmunya Nggak Kaleng-Kaleng!',
    review: 'Sejak mempelajari Ajian Mahakota Raja Iblis dari Guru, hidup saya berubah total. Awalnya saya skeptis, tetapi setelah melakukan ritual sesuai petunjuk, saya merasakan energi gelap yang sangat kuat mengelilingi saya. Dalam 3 hari, musuh bisnis saya tiba-tiba mundur, dan saya mendapatkan proyek besar tanpa usaha keras. Ilmu ini benar-benar dahsyat, tapi harus diimbangi dengan perlindungan spiritual agar tidak terkena efek balik. Mantap jiwa, Tapak Pamungkas!',
    date: '15 Juli 2024',
  },
  {
    id: 'testi002',
    name: 'Agus Mahendra',
    avatarUrl: `https://picsum.photos/seed/ayu/100/100`,
    rating: 4,
    title: 'Pengisian Khodam Betari Durga',
    review: 'Sejak menerima Pengisian Khodam Betari Durga, aura dan energi saya berubah drastis. Saya merasakan keberanian dan kewibawaan yang sebelumnya tidak saya miliki. Dalam pekerjaan, orang-orang mulai menghormati saya tanpa saya perlu memaksa. Ini benar-benar ilmu yang dahsyat! Terima kasih kepada guru yang telah membimbing proses ini dengan hati-hati!',
    date: '28 Juli 2024',
  },
  {
    id: 'testi003',
    name: 'Kang Deden',
    avatarUrl: `https://picsum.photos/seed/deden/100/100`,
    rating: 5,
    title: 'Minyak Balung Sugihnya TOP BGT!',
    review: 'Saya seorang pedagang online, dan setelah memakai Minyak Balung Sugih Super, orderan saya meningkat drastis! Biasanya cuma dapat 5-10 order/hari, sekarang bisa sampai 30-50 order. Benar-benar ajaib! Minyak ini memang cocok untuk pelarisan dagang. Sangat recommended!. Sukses terus buat Tapak Pamungkas!',
    date: '5 Agustus 2024',
  },
   {
    id: 'testi004',
    name: 'Sinta',
    avatarUrl: `https://picsum.photos/seed/sisca/100/100`,
    rating: 5,
    title: 'Minyak Balung sugih',
    review: 'Saya seorang pedagang online, dan setelah memakai Minyak Balung Sugih Super, orderan saya meningkat drastis! Biasanya cuma dapat 5-10 order/hari, sekarang bisa sampai 30-50 order. Benar-benar ajaib! Minyak ini memang cocok untuk pelarisan dagang. Sangat recommended!. Thanks Tapak Pamungkas!',
    date: '12 Agustus 2024',
  },
];

export const getRecentTestimonials = (count: number = 3): Testimonial[] => {
  // For now, just return the first few. In a real app, sort by date.
  return testimonials.slice(0, count);
};
