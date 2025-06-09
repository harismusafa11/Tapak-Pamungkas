import React from 'react';
import { STORE_NAME, MARKETPLACE_LINKS } from '../../constants';
// SparklesIcon might still be used elsewhere, or can be removed if only for logo
// import { SparklesIcon } from '../ui/Icon'; 

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary border-t border-brand-secondary text-text-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mb-6">
          <img src="https://i.ibb.co/XxpzTXQk/logotp.png" alt={`Logo ${STORE_NAME}`} className="h-10 w-10 mr-2 object-contain" />
          <p className="text-xl font-bold text-brand-accent font-serif">{STORE_NAME}</p>
        </div>
        
        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Temuin Toko Kita Di:</h3>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
            {MARKETPLACE_LINKS.map((link) => (
              <a
                key={link.platformName}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-text-secondary hover:text-brand-accent transition-colors duration-300 group"
                aria-label={`Kunjungi ${link.storeName} di ${link.platformName}`}
              >
                <link.Icon className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{link.storeName}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm mb-2">
            Tempatnya Ilmu Gaib & Barang Bertuah Keren!
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} {STORE_NAME}. Hak Cipta Dilindungi Cuy.
          </p>
          <p className="text-xs mt-1">
            Yuk, masuk ke dunia penuh keajaiban & kekuatan bareng kita!
          </p>
        </div>
      </div>
    </footer>
  );
};