import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { STORE_NAME, CATEGORIES_SLUGS } from '../../constants';
import { NavLinkItem, ProductCategory } from '../../types';
import { MenuIcon, XIcon, ChevronDownIcon, SearchIcon, ShoppingCartIcon } from '../ui/Icon';
import { useCart } from '../../contexts/CartContext';

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
  { label: "Konsultan AI", path: "/konsultan-ai" },
  { label: "Tentang Kita", path: "/about" },
  { label: "Kontak", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

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
  const location = useLocation();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

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
  
  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);


  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const NavItemDesktop: React.FC<{ item: NavLinkItem }> = ({ item }) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
    const activeClasses = "bg-brand-accent text-white";
    const inactiveClasses = "text-text-secondary hover:text-text-primary hover:bg-brand-secondary";

    if (item.isDropdown && item.dropdownItems) {
      const isDropdownActive = item.dropdownItems.some(subItem => location.pathname === subItem.path);
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => toggleDropdown(item.label)}
            className={`${baseClasses} ${isDropdownActive ? activeClasses : inactiveClasses} flex items-center w-full justify-between`}
            aria-expanded={openDropdown === item.label}
            aria-haspopup="true"
          >
            <span>{item.label}</span>
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
          </button>
          <div className={`absolute right-0 mt-2 w-56 bg-brand-secondary rounded-md shadow-lg py-1 z-20 ${openDropdown === item.label ? 'block' : 'hidden'}`}>
            {item.dropdownItems.map(subItem => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  onClick={() => setOpenDropdown(null)}
                  className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? activeClasses : inactiveClasses}`}
                >
                  {subItem.label}
                </NavLink>
            ))}
          </div>
        </div>
      );
    }

    return (
      <NavLink
        to={item.path}
        onClick={() => setOpenDropdown(null)}
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
              <img src="https://files.catbox.moe/eq3p0j.png" alt={`Logo ${STORE_NAME}`} className="h-10 w-10 mr-2 object-contain" />
              {STORE_NAME}
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-4">
              {navLinks.map(link => <NavItemDesktop key={link.label} item={link} />)}
            </div>
            <SearchForm
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onSubmit={handleSearchSubmit}
            />
            <Link to="/cart" className="ml-4 relative p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label={`Keranjang Belanja, ${cartItemCount} item`}>
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                        {cartItemCount}
                    </span>
                )}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label={`Keranjang Belanja, ${cartItemCount} item`}>
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                        {cartItemCount}
                    </span>
                )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

      {/* Revamped Mobile Menu */}
      <div className={`md:hidden border-t border-brand-secondary/50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(item => {
            if (item.isDropdown && item.dropdownItems) {
              return (
                <div key={item.label} className="space-y-1">
                  <span className="block px-3 py-2 text-sm font-semibold text-text-primary opacity-75">
                    {item.label}
                  </span>
                  <div className="pl-4 space-y-1">
                    {item.dropdownItems.map(subItem => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive ? 'bg-brand-accent text-white' : 'text-text-secondary hover:text-text-primary hover:bg-brand-secondary'
                          }`
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-accent text-white' : 'text-text-secondary hover:text-text-primary hover:bg-brand-secondary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
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
    </nav>
  );
};