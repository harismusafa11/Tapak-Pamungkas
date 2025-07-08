import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { STORE_NAME, CATEGORIES_SLUGS } from '../../constants';
import { NavLinkItem, ProductCategory } from '../../types';
import { MenuIcon, XIcon, ChevronDownIcon, SearchIcon } from '../ui/Icon'; // SparklesIcon removed from here if only used for logo

const navLinks: NavLinkItem[] = [
  { label: "Beranda", path: "/" },
  { 
    label: "Kategori", 
    path: "#", 
    isDropdown: true,
    dropdownItems: [
      { label: ProductCategory.KEILMUAN_SPIRITUAL, path: `/category/${CATEGORIES_SLUGS[ProductCategory.KEILMUAN_SPIRITUAL]}` },
      { label: ProductCategory.MEDIA_BERTUAH, path: `/category/${CATEGORIES_SLUGS[ProductCategory.MEDIA_BERTUAH]}` },
    ]
  },
  { label: "Tentang Kita", path: "/about" },
  { label: "Kontak", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

// Define SearchForm outside Navbar to prevent re-creation on every render
interface SearchFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isMobile?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, onQueryChange, onSubmit, isMobile }) => (
  <form onSubmit={onSubmit} className={`flex items-center ${isMobile ? 'w-full mt-2' : 'ml-4'}`}>
    <input
      type="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Cari barang mistik..."
      className={`px-3 py-2 text-sm rounded-l-md bg-brand-dark border border-brand-secondary text-text-primary focus:ring-brand-accent focus:border-brand-accent focus:outline-none ${isMobile ? 'w-full' : 'w-48 md:w-64'}`}
    />
    <button
      type="submit"
      className="p-2 bg-brand-accent text-white rounded-r-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-dark"
      aria-label="Cari produk"
    >
      <SearchIcon className="h-5 w-5" />
    </button>
  </form>
);


export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after navigation
      if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu
    }
  };

  const NavItem: React.FC<{ item: NavLinkItem, isMobile?: boolean }> = ({ item, isMobile }) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
    const activeClasses = "bg-brand-accent text-white";
    const inactiveClasses = "text-text-secondary hover:text-text-primary hover:bg-brand-secondary";

    if (item.isDropdown && item.dropdownItems) {
      return (
        <div className="relative" ref={isMobile ? null : dropdownRef}>
          <button
            onClick={() => toggleDropdown(item.label)}
            className={`${baseClasses} ${inactiveClasses} flex items-center`}
            aria-expanded={openDropdown === item.label}
            aria-haspopup="true"
          >
            {item.label}
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
          </button>
          {openDropdown === item.label && (
            <div className={`absolute ${isMobile ? 'static' : 'right-0 mt-2 w-56 bg-brand-secondary'} rounded-md shadow-lg py-1 z-20`}>
              {item.dropdownItems.map(subItem => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  onClick={() => { setOpenDropdown(null); if (isMobile) setIsMobileMenuOpen(false); }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm ${isActive ? activeClasses : inactiveClasses} ${isMobile ? 'pl-8' : ''}`
                  }
                >
                  {subItem.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        to={item.path}
        onClick={() => { setOpenDropdown(null); if (isMobile) setIsMobileMenuOpen(false); }}
        className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <nav className="bg-brand-primary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-xl sm:text-2xl font-bold text-brand-accent font-serif hover:opacity-80 transition-opacity">
              <img src="https://i.ibb.co/XxpzTXQk/logotp.png" alt={`Logo ${STORE_NAME}`} className="h-10 w-10 mr-2 object-contain" />
              {STORE_NAME}
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-4">
              {navLinks.map(link => <NavItem key={link.label} item={link} />)}
            </div>
            <SearchForm
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
            />
          </div>
          <div className="md:hidden flex items-center">
             {/* Optionally, show a search icon to expand search on mobile if not in menu */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              <span className="sr-only">Buka menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-brand-secondary/50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => <NavItem key={link.label} item={link} isMobile />)}
            <div className="border-t border-brand-secondary/30 pt-3 mt-3">
                <SearchForm 
                  isMobile
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  onSubmit={handleSearchSubmit}
                />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};