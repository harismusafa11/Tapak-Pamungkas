// Using Heroicons (MIT License) - https://heroicons.com
// Marketplace icons are custom simplified versions
import React from 'react';

export interface IconProps { // Ensure IconProps is defined or imported if it's in types.ts
  className?: string;
  filled?: boolean; 
}

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25.813a4.5 4.5 0 01-3.09 3.09L11.25 19.5l.813-2.846a4.5 4.5 0 013.09-3.09L17 12l-1.846-.813a4.5 4.5 0 01-3.09-3.09L11.25 4.5l.813 2.846a4.5 4.5 0 013.09 3.09L17 12h1.25z" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.01,2.007c-5.522,0-10,4.478-10,10c0,1.754,0.457,3.395,1.264,4.853L2,22l5.254-1.37c1.411,0.743,3.004,1.177,4.706,1.177c0.03,0,0.06,0,0.09,0c5.522,0,10-4.478,10-10S17.533,2.007,12.01,2.007z M17.193,15.045 c-0.188,0.526-1.057,0.968-1.446,1.007c-0.332,0.031-0.743,0.041-1.118-0.083s-1.177-0.457-2.232-1.361s-1.754-1.544-2.04-1.831 c-0.275-0.275-0.587-0.419-0.587-0.743s0-0.457,0.083-0.587c0.083-0.13,0.232-0.275,0.375-0.419 c0.144-0.144,0.275-0.275,0.419-0.457s0.083-0.275,0-0.457c-0.083-0.188-0.743-1.754-1.018-2.42 c-0.275-0.629-0.509-0.547-0.743-0.547c-0.188,0-0.419,0-0.587,0s-0.457,0.083-0.67,0.332c-0.222,0.25-0.827,0.827-0.827,1.986 s0.868,2.299,0.991,2.462c0.122,0.164,1.65,2.585,4.003,3.512c0.547,0.222,0.991,0.354,1.339,0.457c0.587,0.164,1.137,0.144,1.565,0.083 c0.471-0.083,1.381-0.568,1.565-1.137c0.188-0.547,0.188-1.018,0.122-1.137C17.337,15.229,17.276,15.147,17.193,15.045z" />
  </svg>
);

export const TagIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

export const CubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

export const AcademicCapIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path d="M3.75 6.75c0-1.102. زیرو.898-2 2-2h12.5c1.102 0 2 .898 2 2v7.5c0 1.102-.898 2-2 2h-2.323l-3.177 3.177a.75.75 0 01-1.06 0L9.073 16.25H6.75c-1.102 0-2-.898-2-2V6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75v6.75h2.25V6.75h-2.25zM8.25 6.75v6.75H6V6.75h2.25zM12 6.75v9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5h16.5" />
 </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.935-1.393 1.654-.94l11.39 6.347c.72.402.72 1.478 0 1.88l-11.39 6.347c-.719.453-1.654-.084-1.654-.94V5.653z" />
</svg>
);

export const StarIcon: React.FC<IconProps> = ({ className, filled = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.385a.563.563 0 01.328.959l-4.34 3.142a.563.563 0 00-.182.633l1.627 4.84a.563.563 0 01-.814.626l-4.34-3.14a.563.563 0 00-.652 0l-4.34 3.14a.563.563 0 01-.814-.626l1.627-4.84a.563.563 0 00-.182-.633L2.085 9.89a.563.563 0 01.328-.959h5.385a.563.563 0 00.475-.321L11.48 3.5z" />
  </svg>
);

// Marketplace Icons
export const ShopeeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.985 8.627A2.99 2.99 0 0019.22 7H4.78a2.99 2.99 0 00-.765 1.627l-1.69 6.016A3.002 3.002 0 005.3 19h13.4a3.002 3.002 0 002.976-4.357l-1.69-6.016zM15.5 7c.598 0 1.164.15 1.648.41L12 10.485 6.852 7.41A3.484 3.484 0 018.5 7h7zM8.5 6A2.5 2.5 0 016 3.5C6 2.122 7.121 1 8.5 1S11 2.122 11 3.5V6H8.5zm7 0V3.5C15.5 2.122 16.621 1 18 1s2.5 1.122 2.5 2.399V6h-2.5z" />
  </svg>
);

export const TokopediaIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 12.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h7c.28 0 .5.22.5.5s-.22.5-.5.5zm0-3h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h7c.28 0 .5.22.5.5s-.22.5-.5.5zm-3.4-5.29c-.49-.49-1.28-.49-1.77 0L8.25 8.29a.996.996 0 000 1.41c.49.49 1.28.49 1.77 0L12 7.76l1.98 1.94c.49.49 1.28.49 1.77 0a.996.996 0 000-1.41L12.1 6.21z"/>
  </svg>
);

export const LazadaIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.31 6.265a1.5 1.5 0 00-2.332-.797l-5.31 3.066a1.5 1.5 0 00-.668 2.598l3.29 5.7a1.5 1.5 0 002.598-.668l3.066-5.31a1.5 1.5 0 00-.644-2.589zm-2.012 6.09l-2.59-4.487 4.205-2.428 1.714 2.97-3.329 3.945zM4.5 3A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-3 0v6H6V6h6a1.5 1.5 0 000-3H4.5z"/>
  </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" className={className}>
    <path d="M20.965 3.035A12.45 12.45 0 0 0 14 .5C6.541.5.5 6.541.5 14c0 3.139 1.09 5.998 2.909 8.26l.021.026L2.24 26.76a.748.748 0 0 0 .907.907l4.474-1.19a12.47 12.47 0 0 0 16.348-5.013C26.06 18.72 27.5 14.12 27.5 10c0-3.25-1.075-6.21-2.892-8.577l-.023-.028A12.474 12.474 0 0 0 20.965 3.035zM14 26.5A11.5 11.5 0 1 1 14 3.5a11.5 11.5 0 0 1 0 23zm5.838-10.701c.28-.522.121-1.161-.38-1.498l-6.145-4.085A1.25 1.25 0 0 0 11.75 11v8.5a1.25 1.25 0 0 0 1.802 1.078l6.145-4.085c.502-.336.661-.975.381-1.497a1.243 1.243 0 0 0-.512-.598z"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);