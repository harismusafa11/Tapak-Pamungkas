
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-12 ${className} animate-fade-in-down`}>
      <h2 className="text-4xl md:text-5xl font-bold text-brand-accent font-serif mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-1 w-24 bg-brand-secondary mx-auto rounded-full"></div>
    </div>
  );
};
