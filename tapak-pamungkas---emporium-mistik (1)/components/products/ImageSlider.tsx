
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icon';

interface ImageSliderProps {
  images: string[];
  altText: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-700 flex items-center justify-center text-text-secondary rounded-lg"> {/* Changed from aspect-w-1 aspect-h-1 */}
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

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-xl"> {/* Changed from aspect-w-1 aspect-h-1 */}
      <div className="w-full h-full">
        <img 
          src={displayImages[currentIndex]} 
          alt={`${altText} - ${currentIndex + 1}`} 
          className="w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out"
        />
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
