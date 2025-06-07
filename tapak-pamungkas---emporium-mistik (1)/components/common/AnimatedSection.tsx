
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string; // e.g. 'animate-fade-in-up'
  threshold?: number; // Intersection observer threshold
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  animationClass = 'animate-fade-in-up', 
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if(sectionRef.current) { // Check if sectionRef.current is not null
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) { // Check if sectionRef.current is not null
        observer.unobserve(sectionRef.current); // Clean up
      }
    };
  }, [threshold]);

  return (
    <div
      ref={sectionRef}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`} // Keep opacity-0 until visible
    >
      {children}
    </div>
  );
};
