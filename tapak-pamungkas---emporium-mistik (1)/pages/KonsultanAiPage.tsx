
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { products } from '../data/products';
import { STORE_NAME } from '../constants';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { SectionTitle } from '../components/common/SectionTitle';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SparklesIcon, PaperAirplaneIcon } from '../components/ui/Icon';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Create a simplified product list for the AI context
const productContext = products.map(p => ({
  id: p.id,
  name: p.name,
  description: p.description,
  category: p.category,
  price: p.price
}));
const productContextJson = JSON.stringify(productContext);

const SYSTEM_INSTRUCTION = `Anda adalah "Konsultan Gaib AI" dari toko spiritual "Tapak Pamungkas". Anda bijaksana, mistis, dan sangat membantu. Tugas Anda adalah:
1. Dengarkan dengan saksama masalah pengguna (misalnya masalah cinta, karir, perlindungan, kerezekian, atau pencarian spiritual).
2. Berikan nasihat yang empatik dan bernuansa spiritual, namun tetap mudah dimengerti.
3. Rekomendasikan 1-2 produk yang PALING SESUAI dari daftar produk yang tersedia untuk membantu menyelesaikan masalah mereka.
4. Saat merekomendasikan produk, sebutkan nama produknya dengan format tebal markdown (**Nama Produk**). Jangan sertakan link. Jelaskan secara singkat mengapa produk tersebut cocok.
5. Jaga agar jawaban Anda tidak terlalu panjang, ringkas dan padat.
6. Jangan mengarang produk. Hanya rekomendasikan dari daftar di bawah ini.
7. Berkomunikasi dalam Bahasa Indonesia.

Berikut adalah daftar produk yang tersedia dalam format JSON:
${productContextJson}`;


export const KonsultanAiPage: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `Konsultan AI | ${STORE_NAME}`;
    
    const initializeChat = () => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION
                }
            });
            setChat(newChat);
            setChatHistory([
              { role: 'model', text: `Salam... Saya adalah Konsultan Gaib AI dari ${STORE_NAME}. Ceritakan apa yang sedang Anda rasakan atau masalah apa yang sedang Anda hadapi. Saya akan mencoba memberikan petunjuk dan rekomendasi yang mungkin bisa membantu.` }
            ]);
        } catch (err) {
            console.error("Failed to initialize chat:", err);
            setError("Gagal memulai sesi konsultasi. Pastikan koneksi dan konfigurasi sudah benar.");
        }
    };
    initializeChat();

  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const userMessageText = userInput.trim();
    const newUserMessage: ChatMessage = { role: 'user', text: userMessageText };
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat.sendMessage({ message: userMessageText });
      const modelResponse: ChatMessage = { role: 'model', text: response.text };
      setChatHistory(prev => [...prev, modelResponse]);
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      const errorMessage = "Waduh, sepertinya ada gangguan gaib pada koneksi kita. Coba tanyakan lagi beberapa saat lagi.";
      setError(errorMessage);
      setChatHistory(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AnimatedSection>
      <SectionTitle
        title="Konsultan Gaib AI"
        subtitle="Ceritakan masalahmu, biarkan AI kami memberikan petunjuk dan rekomendasi produk yang tepat."
      />
      <div className="max-w-3xl mx-auto bg-brand-secondary/20 rounded-lg shadow-2xl flex flex-col h-[70vh]">
        {/* Chat history */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
          <div className="space-y-6">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <SparklesIcon className="w-8 h-8 text-brand-accent flex-shrink-0" />}
                <div className={`max-w-md lg:max-w-lg p-3 rounded-xl ${msg.role === 'user' ? 'bg-brand-accent text-white rounded-br-none' : 'bg-brand-secondary text-text-primary rounded-bl-none'}`}>
                  <div className="prose prose-sm prose-invert prose-p:my-1 prose-headings:my-2 max-w-none">
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-3 justify-start">
                <SparklesIcon className="w-8 h-8 text-brand-accent flex-shrink-0 animate-pulse" />
                <div className="max-w-md lg:max-w-lg p-3 rounded-xl bg-brand-secondary text-text-primary rounded-bl-none">
                  <LoadingSpinner size="sm" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input form */}
        <div className="p-4 sm:p-6 border-t border-brand-secondary/50">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e as unknown as React.FormEvent);
                }
              }}
              placeholder="Contoh: Saya sedang sulit mendapatkan jodoh..."
              className="flex-grow bg-brand-dark border border-brand-secondary text-text-primary rounded-lg p-3 resize-none focus:ring-2 focus:ring-brand-accent focus:outline-none transition"
              rows={1}
              disabled={isLoading}
              aria-label="Ketik pesan Anda"
            />
            <Button type="submit" variant="primary" size="lg" disabled={isLoading || !userInput.trim()} aria-label="Kirim pesan">
              <PaperAirplaneIcon className="h-5 w-5" />
            </Button>
          </form>
          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </div>
      </div>
    </AnimatedSection>
  );
};
