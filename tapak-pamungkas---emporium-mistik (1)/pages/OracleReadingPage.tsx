import React, { useState, useEffect, useMemo } from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { oracleCards } from '../data/oracleCards';
import { OracleCard } from '../types';
import { Button } from '../components/ui/Button';
import { SparklesIcon } from '../components/ui/Icon';
import { STORE_NAME } from '../constants';

const CardBack = () => (
    <div className="w-full h-full bg-brand-secondary rounded-lg border-2 border-brand-accent/30 flex items-center justify-center p-4 shadow-lg">
        <img src="https://i.ibb.co/XxpzTXQk/logotp.png" alt="Logo Tapak Pamungkas" className="w-24 h-24 opacity-20" />
    </div>
);

export const OracleReadingPage: React.FC = () => {
    const [deck, setDeck] = useState<OracleCard[]>([]);
    const [selectedCard, setSelectedCard] = useState<OracleCard | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const shuffleDeck = () => {
        // Simple shuffle algorithm
        const shuffled = [...oracleCards].sort(() => 0.5 - Math.random());
        setDeck(shuffled.slice(0, 8)); // Use 8 cards for a nice grid
    };

    useEffect(() => {
        document.title = `Ramalan Kartu | ${STORE_NAME}`;
        shuffleDeck();
    }, []);
    
    const handleCardSelect = (card: OracleCard) => {
        if (!isRevealed) {
            setSelectedCard(card);
            setIsRevealed(true);
        }
    };

    const handleReset = () => {
        setIsRevealed(false);
        // Add a small delay before shuffling to allow for fade-out animation
        setTimeout(() => {
            setSelectedCard(null);
            shuffleDeck();
        }, 500);
    };

    return (
        <AnimatedSection>
            <SectionTitle 
                title="Ramalan Kartu Gaib"
                subtitle={!isRevealed ? "Fokuskan pertanyaan dalam hatimu, lalu pilih satu kartu yang paling menarik perhatianmu." : "Inilah petunjuk untukmu..."}
            />

            {!isRevealed ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto perspective-1000">
                    {deck.map((card) => (
                        <div
                            key={card.id}
                            className="aspect-[2/3] cursor-pointer group transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105"
                            onClick={() => handleCardSelect(card)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCardSelect(card)}
                            tabIndex={0}
                            aria-label={`Pilih kartu ${card.name}`}
                        >
                           <CardBack />
                        </div>
                    ))}
                </div>
            ) : (
                <AnimatedSection animationClass="animate-fade-in-up" className={`max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <img 
                            src={selectedCard?.imageUrl} 
                            alt={`Kartu ${selectedCard?.name}`} 
                            className="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl shadow-brand-accent/20"
                        />
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-accent mb-3">{selectedCard?.name}</h3>
                        <div className="mb-4">
                            {selectedCard?.keywords.map(keyword => (
                                <span key={keyword} className="inline-block bg-brand-secondary/50 text-text-secondary text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                        <p className="text-text-primary leading-relaxed text-lg whitespace-pre-line">{selectedCard?.meaning}</p>
                        <Button onClick={handleReset} variant="outline" size="lg" className="mt-8" leftIcon={<SparklesIcon className="w-5 h-5"/>}>
                            Tarik Kartu Lagi
                        </Button>
                    </div>
                </AnimatedSection>
            )}
        </AnimatedSection>
    );
};
