
import { Product, ProductCategory } from '../types';

// PENTING: Ganti URL placeholder di bawah ini dengan DIRECT LINK ke gambar produkmu di Google Drive atau layanan hosting lainnya.
// Contoh Direct Link Google Drive: https://drive.google.com/uc?export=view&id=FILE_ID_ANDA
// Pastikan gambar di Google Drive sudah di-setting "Anyone with the link can view".

export const products: Product[] = [
  // Produk Awal Kategori Pengetahuan Mistik
  {
    id: 'mk001',
    name: 'Gulungan Rune Kuno',
    description: 'Bongkar bahasa & simbol kekuatan kuno pakai gulungan keren yang dibuat mirip aslinya ini.',
    detailedDescription: 'Gulungan ini isinya panduan lengkap soal alfabet runic kuno, artinya, sama cara pakainya buat ritual sihir. Dibuat di atas perkamen imitasi dan dibikin keliatan tua biar otentik, gulungan ini cocok buat pajangan keren sekaligus alat buat yang lagi belajar ilmu misterius. Katanya sih, cuma dengan jiplak rune-nya aja udah bisa ngebuka kemampuan intuitif yang terpendam. Ukuran: 30cm x 100cm (kalau dibuka). Bahan: Perkamen sintetis kualitas oke, rol kayu.',
    price: 799900,
    stock: 15,
    category: ProductCategory.PENGETAHUAN_MISTIK,
    images: [
      'https://drive.google.com/uc?export=view&id=1TRRhL5WS0n3JS4qhZWAOSmud0vVqy_uH',
      'https://drive.google.com/uc?export=view&id=1xUCxhFeJGfbzjpAPOmYcARHs3nfJDTIR',
      'https://picsum.photos/seed/mk001_detail2/600/600',
    ],
    featured: true,
    material: "Perkamen Sintetis, Kayu",
    origin: "Terinspirasi Juru Tulis Eldoria"
  },
  {
    id: 'mk002',
    name: 'Pengantar Proyeksi Astral',
    description: 'Panduan buat pemula yang pengen jalan-jalan ke alam astral & nambah wawasan.',
    detailedDescription: 'Kursus digital lengkap ini (dikirim dalam bentuk USB drive ajaib!) ngasih tau langkah-langkahnya, meditasi terpandu, sama cara aman buat perjalanan astral. Belajar gimana misahin tubuh astralmu, jalan-jalan di alam non-fisik, dan balik lagi dengan selamat. Ada bonus bab soal lucid dreaming sama perlindungan energi. Butuh pikiran yang tenang dan rasa penasaran yang tinggi sama hal-hal gaib.',
    price: 495000,
    stock: 50,
    category: ProductCategory.PENGETAHUAN_MISTIK,
    images: [
      'https://picsum.photos/seed/mk002_utama/600/600',
      'https://picsum.photos/seed/mk002_detail1/600/600',
    ],
    material: "USB Drive (Casingnya Ajaib!)",
    origin: "Ajaran Ordo Tali Perak"
  },
  {
    id: 'mk003',
    name: 'Grimoire Sang Herbalis',
    description: 'Buku keren berjilid yang isinya detail soal sifat magis tumbuhan & kegunaannya.',
    detailedDescription: 'Grimoire ini tuh gudangnya ilmu herbal, ngebahas semuanya mulai dari tanaman kebun biasa sampe flora langka yang ajaib. Pelajari soal sifat obat, magis, sama spiritualnya, plus resep ramuan, dupa, dan jimat. Dijilid pakai kulit imitasi dengan detail timbul yang cakep. Isinya 250 halaman.',
    price: 950000,
    stock: 12,
    category: ProductCategory.PENGETAHUAN_MISTIK,
    images: [
      'https://picsum.photos/seed/mk003_cover/600/600',
      'https://picsum.photos/seed/mk003_halaman/600/600',
    ],
    material: "Kulit Imitasi, Kertas Daur Ulang",
    origin: "Arsip Benteng Greenwood"
  },

  // Produk Tambahan Kategori Pengetahuan Mistik (mk004 - mk060)
  ...Array.from({ length: 57 }, (_, i) => {
    const id = `mk${String(i + 4).padStart(3, '0')}`;
    const names = [
        "Modul Tarot Digital Lengkap", "Ebook Astrologi Veda Pemula", "Kursus Online Reiki Level 1", "Audio Meditasi Terpandu Kuno",
        "Koleksi Sigil Digital Siap Pakai", "Panduan Lengkap Lucid Dream (PDF)", "Paket Audio Frekuensi Solfeggio", "Kitab Herbalisme Digital Interaktif",
        "Video Tutorial Skrying Cermin Hitam", "Jurnal Mimpi Interaktif Harian", "Aplikasi Tafsir Mimpi Berbasis AI", "Game Edukasi Mitologi Nusantara",
        "Filter AR Rune Kuno untuk Sosmed", "Koleksi Font Aksara Kuno Digital", "Wallpaper Ponsel Simbol Sakral HD", "Paket Stiker WhatsApp Mistik Unik",
        "Generator Nama Gaib Otomatis", "Kalender Astrologi Interaktif 2024", "Akses Eksklusif Komunitas Spiritual Online", "Template Undangan Ritual Digital Keren",
        "Ebook Sejarah Okultisme Dunia", "Panduan Membuat Jimat Pribadi (DIY Kit)", "Kumpulan Cerita Rakyat Mistik Audio", "Langganan Podcast Misteri Nusantara",
        "Rekaman Webinar Penyembuhan Energi", "Kursus Singkat Bahasa Sanskerta Dasar", "Analisis Numerologi Nama Online Cepat", "Generator Puisi Otomatis Tema Mistik",
        "Peta Bintang Kelahiran Digital Personal", "Glosarium Istilah Esoteris Terlengkap", "Akses ke Rekaman Ritual Kuno Langka", "Kompilasi Musik Relaksasi Supranatural",
        "Kursus Membuat Minyak Esensial Gaib", "Panduan Mengenal Khodam Pendamping (Ebook)", "Ebook Teknik Membaca Aura untuk Pemula", "Seri Komik Digital Legenda Lokal",
        "Aplikasi Meditasi Harian Tema Mistik", "Panduan Keamanan Gaib Digital (PDF)", "Konsep Simulasi Perjalanan Astral VR", "Database Tumbuhan Obat Gaib Online",
        "Keanggotaan Forum Diskusi Paranormal", "Layanan Konsultasi Tarot Cepat via Chat", "Ramalan Harian Berbasis I Ching (App)", "Workshop Online Menulis Kreatif Mistik",
        "Koleksi Doa dan Mantra Kuno (Teks & Audio)", "Panduan Diet Spiritual Seimbang", "Ebook Yoga Supranatural Tingkat Lanjut", "Kursus Membuat Lilin Berenergi Sendiri",
        "Akses ke Grup Meditasi Bersama Online", "Layanan Analisis Cakra Personal (Jarak Jauh)", "Deskripsi Layanan Pembersihan Energi Rumah", "Ebook Feng Shui Rumah Tinggal Praktis",
        "Panduan Lengkap Membuat Altar Pribadi", "Kumpulan Simbol Perlindungan Digital (Vektor)", "Permainan Teka-Teki Mistik Online Seru", "Serial Video Dokumenter Tempat Angker Indonesia",
        "Audiobook Kompilasi Kisah Supranatural", "Kursus Online Membaca Kartu Lenormand", "Template Jurnal Spiritualitas Harian Cantik"
    ];
    const name = names[i % names.length] + ` #${i + 1}`; // Ensure unique names
    return {
      id,
      name,
      description: `Pelajari ${name.toLowerCase()} dengan metode yang asyik dan mudah dipahami. Cocok buat kamu yang haus ilmu!`,
      detailedDescription: `Ini adalah paket ${name.toLowerCase()} super lengkap yang dirancang khusus buat kamu. Isinya ada materi A, B, C, dan bonus XYZ. Dijamin nambah wawasanmu soal dunia gaib dan spiritual. Buruan sikat sebelum kehabisan! Ini barang digital ya, jadi langsung dikirim setelah konfirmasi.`,
      price: Math.floor(Math.random() * (1500 - 50 + 1) + 50) * 1000, // Rp 50.000 - Rp 1.500.000
      stock: Math.floor(Math.random() * 95) + 5, // 5 - 100
      category: ProductCategory.PENGETAHUAN_MISTIK,
      images: [
        `https://picsum.photos/seed/${id}_utama/600/600`,
        `https://picsum.photos/seed/${id}_detail1/600/600`,
        `https://picsum.photos/seed/${id}_detail2/600/600`,
      ],
      featured: Math.random() < 0.1, // 10% chance of being featured
      material: "Digital (PDF, Video, Audio, Aplikasi)",
      origin: "Kompilasi Tim Tapak Pamungkas"
    };
  }),

  // Produk Awal Kategori Media Berjimat
  {
    id: 'cm001',
    name: 'Amulet Ketenangan',
    description: 'Amulet cakep yang dirancang buat nenangin pikiran & nangkal energi negatif.',
    detailedDescription: 'Ditempa pakai tangan dari perak yang diberkahi cahaya bulan dan ada batu bulannya yang kinclong, amulet ini katanya punya getaran yang menenangkan. Pakai ini buat nambah kedamaian, ngurangin cemas, dan bikin aura pelindung dari gangguan psikis. Tiap amulet itu unik dan ada sertifikat pemberkatannya. Panjang rantai: 50cm.',
    price: 1290000,
    stock: 8,
    category: ProductCategory.MEDIA_BERJIMAT,
    images: [
      'https://picsum.photos/seed/cm001_utama/600/600',
      'https://picsum.photos/seed/cm001_detail1/600/600',
      'https://picsum.photos/seed/cm001_detail2/600/600',
      'https://picsum.photos/seed/cm001_detail3/600/600',
    ],
    featured: true,
    material: "Perak Sterling, Batu Bulan",
    dimensions: "Liontin: diameter 3cm",
    origin: "Paguyuban Air Terjun Bisikan"
  },
  {
    id: 'cm002',
    name: 'Dek Oracle Bisikan',
    description: 'Satu set isi 78 kartu dengan gambar unik buat ramalan & introspeksi diri.',
    detailedDescription: 'Kartu-kartu ini, yang desainnya dibuat sama seorang mistikus pertapa, bisa nyambung ke alam bawah sadarmu buat ngasih petunjuk dan kejelasan. Gambarnya penuh simbol, diambil dari berbagai tradisi esoteris. Udah termasuk buku panduan yang ngejelasin arti kartu sama berbagai cara tebarannya. Cocok buat yang baru belajar baca kartu atau yang udah jago. Ukuran kartu: 7cm x 12cm.',
    price: 650000,
    stock: 22,
    category: ProductCategory.MEDIA_BERJIMAT,
    images: [
      'https://picsum.photos/seed/cm002_utama/600/600',
      'https://picsum.photos/seed/cm002_kartu1/600/600',
      'https://picsum.photos/seed/cm002_kartu2/600/600',
    ],
    material: "Karton Kualitas Tinggi, Kantong Beludru",
    origin: "Pengrajin: Elara Meadowlight"
  },
  {
    id: 'cm003',
    name: 'Bola Kristal Penglihatan',
    description: 'Bola kristal bening tanpa cacat buat meramal & ningkatin kemampuan psikis.',
    detailedDescription: 'Bola kristal diameter 10cm ini dibuat dari kuarsa murni yang diambil secara etis. Dipoles sampe kinclong sempurna, bola ini bisa jadi titik fokus buat ramalan, meditasi, sama kerjaan energi. Udah dapet dudukan kayu berukir juga. Kalau diliatin terus, kedalamannya bisa ngasih liat sekilas masa lalu, sekarang, atau masa depan. Hati-hati ya megangnya, harus dengan hormat.',
    price: 1999900,
    stock: 5,
    category: ProductCategory.MEDIA_BERJIMAT,
    images: [
      'https://picsum.photos/seed/cm003_bolakristal/600/600',
      'https://picsum.photos/seed/cm003_dudukan/600/600',
      'https://picsum.photos/seed/cm003_detail/600/600',
    ],
    material: "Kristal Kuarsa Alami, Kayu",
    dimensions: "Bola Diameter 10cm",
    origin: "Tambang Gunung Berkabut"
  },

  // Produk Tambahan Kategori Media Berjimat (cm004 - cm020)
  ...Array.from({ length: 17 }, (_, i) => {
    const id = `cm${String(i + 4).padStart(3, '0')}`;
    const names = [
        "Orgonite Piramida Pelindung Radiasi", "Kalung Kristal Citrine Penarik Hoki", "Gelang Batu Akik Sulaiman Asli",
        "Patung Ganesha Mini dari Kuningan Sari", "Botol Air Zam-Zam Murni (Kecil)", "Set Kristal Penyembuh 7 Cakra",
        "Liontin Pentagram Perak Sterling Ukir", "Cincin Batu Merah Delima Sintetis Cutting", "Minyak Misik Putih Non-Alkohol Murni",
        "Kain Mori Hitam untuk Ritual Khusus", "Replika Keris Semar Mesem (Mainan)", "Mustika Kelapa Mini Asli Bertuah",
        "Batu Combong Ukuran Kecil Alami", "Tasbih Biji Jenitri Pilihan 99 Butir", "Hio India Aroma Sandalwood Premium",
        "Tempat Dupa Keramik Unik Desain Naga", "Lonceng Angin Bambu Nada Meditasi Zen",
    ];
    const name = names[i % names.length] + ` #${i + 1}`; // Ensure unique names
    const materials = ["Batu Alam", "Logam Mulia", "Kayu Langka", "Kain Ritual", "Kristal Pilihan", "Resin Orgon"];
    const origins = ["Pengrajin Lokal", "Impor Tibet", "Warisan Leluhur", "Pemberkatan Khusus", "Energi Alam"];
    return {
      id,
      name,
      description: `Bawa energi positif dan perlindungan dengan ${name.toLowerCase()}. Barang langka, stok terbatas!`,
      detailedDescription: `${name} ini bukan sembarang barang lho! Dibuat dengan ritual khusus dan bahan-bahan pilihan yang energinya kuat banget. Cocok buat kamu yang lagi cari proteksi, hoki, atau ketenangan batin. Desainnya juga artistik, bisa jadi pajangan keren. Ukuran dan berat bervariasi, tanya admin aja buat detailnya.`,
      price: Math.floor(Math.random() * (3000 - 100 + 1) + 100) * 1000, // Rp 100.000 - Rp 3.000.000
      stock: Math.floor(Math.random() * 28) + 2, // 2 - 30
      category: ProductCategory.MEDIA_BERJIMAT,
      images: [
        `https://picsum.photos/seed/${id}_utama/600/600`,
        `https://picsum.photos/seed/${id}_detail1/600/600`,
      ],
      featured: Math.random() < 0.15, // 15% chance of being featured
      material: materials[i % materials.length],
      dimensions: `Variatif, sekitar ${5 + (i%5)}cm x ${3 + (i%3)}cm`,
      origin: origins[i % origins.length]
    };
  }),
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) {
    return [];
  }
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    product.detailedDescription.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toString().toLowerCase().includes(lowerCaseQuery) || // Category is an enum
    (product.material && product.material.toLowerCase().includes(lowerCaseQuery)) ||
    (product.origin && product.origin.toLowerCase().includes(lowerCaseQuery))
  );
};