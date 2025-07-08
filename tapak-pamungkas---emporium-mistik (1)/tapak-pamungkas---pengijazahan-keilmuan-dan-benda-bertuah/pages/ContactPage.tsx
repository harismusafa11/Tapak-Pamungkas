
import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { Button } from '../components/ui/Button';
import { WHATSAPP_NUMBER, STORE_NAME } from '../constants';
import { WhatsAppIcon, SparklesIcon } from '../components/ui/Icon';

export const ContactPage: React.FC = () => {
  React.useEffect(() => {
    document.title = `Kontak Kita | ${STORE_NAME}`;
  }, []);

  const directWhatsappMessage = `Halo ${STORE_NAME}, aku mau tanya-tanya dong soal barang-barang mistiknya!`;
  const directWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(directWhatsappMessage)}`;

  return (
    <AnimatedSection className="space-y-12">
      <SectionTitle title="Ngobrol Sama Kita Yuk!" subtitle="Kita siap bantu kamu nih di perjalanan mistikmu. Jangan malu-malu!" />

      <div className="max-w-2xl mx-auto bg-brand-secondary/10 p-8 md:p-12 rounded-lg shadow-xl text-center">
        <SparklesIcon className="w-16 h-16 text-brand-accent mx-auto mb-6" />
        <h3 className="text-2xl font-serif font-semibold text-text-primary mb-4">Langsung Aja Chat Kita!</h3>
        <p className="text-text-secondary mb-8">
          Kalau ada yang mau ditanyain, penasaran soal barang, atau mau curhat soal kebutuhan mistikmu, cara paling gampang ya langsung chat kita di WhatsApp. Kita bakal bantu secara personal biar kamu nemu yang paling pas buatmu.
        </p>
        
        <a href={directWhatsappLink} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="lg" leftIcon={<WhatsAppIcon className="h-6 w-6" />}>
            Chat di WhatsApp Sekarang!
          </Button>
        </a>

        <div className="mt-10 pt-6 border-t border-brand-secondary/50">
          <h4 className="text-xl font-serif text-text-primary mb-2">Nomor WhatsApp Kita:</h4>
          <p className="text-brand-accent text-lg font-semibold">{`+${WHATSAPP_NUMBER}`}</p>
          <p className="text-xs text-text-secondary mt-2">(Inget ya: Ini buat tanya-tanya dan order via chat aja, biar fokus.)</p>
        </div>
        
        <p className="text-text-secondary mt-10 text-sm">
          Kita tunggu kabarmu ya! Gak sabar mau bantu kamu menjelajahi keajaiban di {STORE_NAME}.
        </p>
      </div>
    </AnimatedSection>
  );
};
