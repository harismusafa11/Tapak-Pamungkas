import React, { useState, useEffect, useCallback } from 'react';
import { XIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from './Icon';

interface ImagePreviewModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
  productName = "Gambar Produk"
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setHasLoadError(false); // Reset error state each time modal opens or initialIndex changes
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        onClose();
      }
      if (images.length > 1) {
        if (event.key === 'ArrowLeft') {
          goToPrevious();
        } else if (event.key === 'ArrowRight') {
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Ensure overflow is reset on unmount
    };
  }, [isOpen, initialIndex, onClose, images.length]);

  useEffect(() => {
    // Reset error when current image source changes
    setHasLoadError(false);
  }, [currentIndex, images]);

  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handleImageError = () => {
    console.warn(`[ImagePreviewModal] Gagal memuat gambar: ${images[currentIndex]}`);
    setHasLoadError(true);
  };

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  const currentImageSrc = images[currentIndex];

  const ImagePlaceholder: React.FC<{isError?: boolean}> = ({ isError = false }) => (
    <div className="w-full h-full bg-brand-secondary/50 flex flex-col items-center justify-center text-text-secondary p-4 rounded-lg">
      <SparklesIcon className="w-16 h-16 mb-2 opacity-60" />
      <p className="text-center">{isError ? "Gambar ini gagal dimuat." : "Tidak ada gambar."}</p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in-down"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-preview-title"
    >
      <div
        className="bg-brand-dark p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-3xl max-h-[95vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center mb-4">
            <h2 id="image-preview-title" className="text-lg font-semibold text-text-primary truncate" title={productName}>
                {productName} ({currentIndex + 1}/{images.length})
            </h2>
            <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-brand-secondary/50 rounded-full transition-colors"
            aria-label="Tutup pratinjau gambar"
            title="Tutup (Esc)"
            >
            <XIcon className="h-6 w-6" />
            </button>
        </div>

        <div className="flex-grow flex items-center justify-center overflow-hidden">
          {hasLoadError || !currentImageSrc ? (
            <ImagePlaceholder isError={!!hasLoadError} />
          ) : (
            <img
              src={currentImageSrc}
              alt={`${productName} - Gambar ${currentIndex + 1}`}
              className="max-w-full max-h-[calc(95vh-120px)] object-contain rounded"
              onError={handleImageError}
              loading="lazy"
            />
          )}
        </div>

        {images.length > 1 && (
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-secondary/30">
            <button
              onClick={goToPrevious}
              className="p-3 bg-brand-secondary/40 hover:bg-brand-secondary/70 rounded-lg transition-colors text-text-primary flex items-center"
              aria-label="Gambar sebelumnya"
              title="Gambar Sebelumnya (Panah Kiri)"
            >
              <ChevronLeftIcon className="h-6 w-6" />
              <span className="ml-2 hidden sm:inline">Sebelumnya</span>
            </button>
            <span className="text-sm text-text-secondary" aria-live="polite">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={goToNext}
              className="p-3 bg-brand-secondary/40 hover:bg-brand-secondary/70 rounded-lg transition-colors text-text-primary flex items-center"
              aria-label="Gambar berikutnya"
              title="Gambar Berikutnya (Panah Kanan)"
            >
              <span className="mr-2 hidden sm:inline">Berikutnya</span>
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
