
import React from 'react';
import { Testimonial } from '../../types';
import { StarRating } from '../common/StarRating';
import { SparklesIcon } from '../ui/Icon'; // Or a quote icon

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-brand-secondary/30 p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-brand-accent/20 hover:-translate-y-1 flex flex-col h-full animate-fade-in-up">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatarUrl || `https://picsum.photos/seed/${testimonial.id}/100/100`}
          alt={`Avatar ${testimonial.name}`}
          className="w-16 h-16 rounded-full mr-4 border-2 border-brand-accent object-cover"
        />
        <div>
          <h4 className="text-lg font-semibold text-text-primary font-serif">{testimonial.name}</h4>
          <StarRating rating={testimonial.rating} size="w-4 h-4" />
        </div>
      </div>
      {testimonial.title && (
        <h5 className="text-md font-semibold text-brand-accent mb-2 flex items-center">
          <SparklesIcon className="w-4 h-4 mr-2 opacity-70" />
          {testimonial.title}
        </h5>
      )}
      <p className="text-sm text-text-secondary leading-relaxed flex-grow">
        "{testimonial.review}"
      </p>
      <p className="text-xs text-text-secondary/70 mt-4 text-right">{testimonial.date}</p>
    </div>
  );
};
