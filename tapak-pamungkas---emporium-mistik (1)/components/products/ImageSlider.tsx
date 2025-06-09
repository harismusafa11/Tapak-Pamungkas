
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '../ui/Icon';

interface ImageSliderProps {
  images: string[];
  altText: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // State untuk melacak error per gambar: Record<urlGambar, boolean (hasError)>
  const [imageErrorStatus, setImageErrorStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset error status jika gambar atau currentIndex berubah (misalnya, gambar baru dimuat)
    // Ini penting agar error dari gambar sebelumnya tidak terbawa ke gambar baru di index yang sama
    if (images && images.length > 0 && images[currentIndex]) {
        // Hanya reset error untuk gambar saat ini jika belum pernah dicoba atau tidak error
        // Ini mencegah loop jika gambar memang error permanen
        if (imageErrorStatus[images[currentIndex]] === undefined || imageErrorStatus[images[currentIndex]] === false) {
           setImageErrorStatus(prevStatus => ({ ...prevStatus, [images[currentIndex]]: false }));
        }
    }
  }, [currentIndex, images]); // Dependency array diubah untuk lebih tepat


  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-brand-secondary/30 flex items-center justify-center text-text-secondary rounded-lg">
        Yah, Gambarnya Nggak Ada
      </div>
    );
  }
  
  const displayImages = images.slice(0, 9); // Max 9 images

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? displayImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === displayImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleImageError = (src: string) => {
    console.warn(`[ImageSlider] Gagal memuat gambar: ${src} untuk slider "${altText}"`);
    setImageErrorStatus(prevStatus => ({ ...prevStatus, [src]: true }));
  };
  
  const currentImageSrc = displayImages[currentIndex];
  const hasErrorForCurrentSlide = imageErrorStatus[currentImageSrc];

  const ImagePlaceholder: React.FC<{isError?: boolean}> = ({ isError = false }) => (
    <div className="w-full h-full object-cover object-center bg-brand-secondary/50 flex flex-col items-center justify-center text-text-secondary p-4 rounded-lg">
      <SparklesIcon className="w-16 h-16 mb-2 opacity-60" />
      <p className="text-center">{isError ? "Gambar slide ini rusak" : "Gambar tidak tersedia"}</p>
    </div>
  );


  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-xl">
      <div className="w-full h-full">
        {hasErrorForCurrentSlide || !currentImageSrc ? (
          <ImagePlaceholder isError={!!hasErrorForCurrentSlide} />
        ) : (
          <img 
            src={currentImageSrc} 
            alt={`${altText} - ${currentIndex + 1}`} 
            className="w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out"
            onError={() => handleImageError(currentImageSrc)}
            loading="lazy"
          />
        )}
      </div>
      {displayImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent"
            aria-label="Gambar sebelumnya"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent"
            aria-label="Gambar berikutnya"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      )}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {displayImages.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex ? 'bg-brand-accent scale-125' : 'bg-gray-400/50 hover:bg-gray-300/70'
              }`}
              aria-label={`Lompat ke gambar ${slideIndex + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};
