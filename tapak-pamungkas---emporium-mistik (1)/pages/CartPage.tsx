import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { SectionTitle } from '../components/common/SectionTitle';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { Button } from '../components/ui/Button';
import { TrashIcon, WhatsAppIcon, ShoppingCartIcon } from '../components/ui/Icon';
import { STORE_NAME, WHATSAPP_NUMBER } from '../constants';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const generateWhatsAppMessage = () => {
    let message = `Halo ${STORE_NAME}, saya mau pesan barang-barang ini dari keranjang belanja saya:\n\n`;
    cart.forEach(item => {
      message += `- *${item.name}* (x${item.quantity}) - Rp${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    message += `\n*Total Pesanan: Rp${totalPrice.toLocaleString('id-ID')}*`;
    message += "\n\nMohon info selanjutnya ya. Terima kasih!";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };
  
  React.useEffect(() => {
    document.title = `Keranjang Belanja | ${STORE_NAME}`;
  }, []);

  return (
    <AnimatedSection>
      <SectionTitle
        title="Keranjang Belanja Gaibmu"
        subtitle={cart.length > 0 ? `Kamu punya ${totalItems} barang di keranjang.` : "Keranjangmu masih kosong nih, ayo cari barang mistik!"}
      />
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingCartIcon className="w-24 h-24 mx-auto text-brand-secondary mb-4" />
          <p className="text-xl text-text-secondary mb-6">Ayo isi keranjangmu dengan kekuatan dan keajaiban!</p>
          <Link to="/">
            <Button variant="primary" size="lg">Mulai Berburu Harta Karun</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center bg-brand-secondary/20 p-4 rounded-lg shadow-md gap-4">
                <Link to={`/product/${item.id}`}>
                    <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                </Link>
                <div className="flex-grow">
                  <Link to={`/product/${item.id}`} className="hover:underline">
                    <h3 className="font-semibold text-text-primary">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-text-secondary">Rp{item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                    min="1"
                    className="w-16 bg-brand-dark border border-brand-secondary text-center rounded-md p-1 focus:ring-brand-accent focus:border-brand-accent"
                    aria-label={`Jumlah ${item.name}`}
                  />
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 p-2" aria-label={`Hapus ${item.name}`}>
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
             <div className="mt-4 text-right">
                <Button variant="outline" onClick={clearCart}>
                    Kosongkan Keranjang
                </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-brand-secondary/30 p-6 rounded-lg shadow-lg h-fit lg:sticky lg:top-24">
            <h2 className="text-2xl font-serif font-bold text-text-primary border-b border-brand-secondary/50 pb-3 mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2 text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} barang)</span>
                <span>Rp{totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-text-primary text-xl pt-4 border-t border-brand-secondary/50">
                <span>Total</span>
                <span>Rp{totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <a href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer" className="block mt-6">
              <Button variant="primary" size="lg" fullWidth leftIcon={<WhatsAppIcon className="w-6 h-6" />}>
                Pesan Semua via WhatsApp
              </Button>
            </a>
            <p className="text-xs text-text-secondary text-center mt-3">
                Kamu akan diarahkan ke WhatsApp untuk menyelesaikan pesanan.
            </p>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};