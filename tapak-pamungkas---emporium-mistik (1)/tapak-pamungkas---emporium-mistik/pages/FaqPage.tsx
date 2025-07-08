
import React, { useState } from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { faqData } from '../data/faqData';
import { ChevronDownIcon } from '../components/ui/Icon';
import { STORE_NAME, WHATSAPP_NUMBER } from '../constants';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-brand-secondary/30">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 px-2 text-left text-text-primary hover:bg-brand-secondary/20 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium font-serif">{question}</span>
        <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-brand-accent`} />
      </button>
      {isOpen && (
        <div className="py-5 px-4 text-text-secondary bg-brand-secondary/10 leading-relaxed animate-fade-in-down">
          <p dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br />') }}></p>
        </div>
      )}
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  React.useEffect(() => {
    document.title = `Yang Sering Ditanyain | ${STORE_NAME}`;
  }, []);

  const handleAccordionClick = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <AnimatedSection className="space-y-12">
      <SectionTitle title="Yang Sering Ditanyain (FAQ)" subtitle="Ini jawaban buat pertanyaan yang sering muncul soal barang & jasa mistik kita. Cekidot!" />
      
      <div className="max-w-3xl mx-auto bg-brand-secondary/10 p-2 md:p-6 rounded-lg shadow-xl">
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openAccordion === item.id}
            onClick={() => handleAccordionClick(item.id)}
          />
        ))}
      </div>
       <AnimatedSection className="text-center mt-16">
        <p className="text-text-secondary text-lg mb-4">Gak nemu jawaban yang kamu cari di sini?</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo ${STORE_NAME}, aku mau tanya dong, di FAQ gak ada nih jawabannya.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-accent text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300" // Ensuring text is white on red bg
        >
          Tanya Kita di WhatsApp Aja!
        </a>
      </AnimatedSection>
    </AnimatedSection>
  );
};
