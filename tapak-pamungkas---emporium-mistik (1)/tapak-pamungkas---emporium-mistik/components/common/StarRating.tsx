
import React from 'react';
import { StarIcon } from '../ui/Icon';

interface StarRatingProps {
  rating: number; // Value from 0 to 5
  totalStars?: number;
  size?: string; // Tailwind CSS size class like 'w-5 h-5'
  className?: string;
  starColor?: string; // Tailwind CSS color class for filled stars e.g. 'text-yellow-400'
  emptyStarColor?: string; // Tailwind CSS color class for empty stars e.g. 'text-gray-300'
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 'w-5 h-5',
  className = '',
  starColor = 'text-brand-accent', // Using brand accent (red) for stars
  emptyStarColor = 'text-gray-500',
}) => {
  const fullStars = Math.floor(rating);
  // Optional: Handle half stars if needed in the future
  // const hasHalfStar = rating % 1 !== 0; 

  return (
    <div className={`flex items-center ${className}`} role="img" aria-label={`Rating: ${rating} dari ${totalStars} bintang`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            className={`${size} ${starValue <= fullStars ? starColor : emptyStarColor}`}
            filled={starValue <= fullStars}
          />
        );
      })}
    </div>
  );
};
