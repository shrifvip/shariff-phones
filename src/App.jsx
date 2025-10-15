// src/App.jsx
import React, { useMemo, useState } from 'react';
import './index.css';
import {
  Smartphone, Search, Filter, ShieldCheck,
  Truck, MessageCircle, Star, CheckCircle2, ShoppingCart
} from 'lucide-react';

/* ===========================
   Inline Data (images included)
   =========================== */
const CURRENCIES = {
  EUR: { symbol: '€', rate: 1 },
  GBP: { symbol: '£', rate: 0.85 },
  USD: { symbol: '$', rate: 1.07 },
};

const PRODUCTS = [
  {
    id: 'ip15-128-black-a',
    name: 'iPhone 15',
    storage: '128GB',
    grade: 'A',
    color: 'Black',
    price: 650,
    was: 799,
    img: 'https://cdn.pixabay.com/photo/2023/09/26/10/55/iphone-15-pro-8275511_1280.jpg',
  },
  {
    id: 'ip14-128-blue-a',
    name: 'iPhone 14',
    storage: '128GB',
    grade: 'A',
    color: 'Blue',
    price: 530,
    was: 649,
    img: 'https://cdn.pixabay.com/photo/2022/09/13/14/14/iphone-14-7451947_1280.jpg',
  },
  {
    id: 'ip13-256-starlight-a',
    name: 'iPhone 13',
    storage: '256GB',
    grade: 'A',
    color: 'Starlight',
    price: 470,
    was: 599,
    img: 'https://cdn.pixabay.com/photo/2021/09/24/18/12/iphone-13-6654369_1280.jpg',
  },
  {
    id: 'ip12-128-purple-b',
    name: 'iPhone 12',
    storage: '128GB',
    grade: 'B',
    color: 'Purple',
    price: 380,
    was: 499,
    img: 'https://cdn.pixabay.com/photo/2021/02/04/16/38/iphone-12-5982449_1280.jpg',
  },
];

/* =============== Helpers =============== */
function formatPrice(eur, currency) {
  const { symbol, rate } = CURRENCIES[currency];
  const val = Math.round(eur * rate);
  return `${symbol}${val.toLocaleString()}`;
}

/* =============== App =================== */
export default function App() {
  // WhatsApp number (digits only)
  const whatsappNumber = '353852592710';

  const [query, setQuery] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [filters, setFilters] = useState({ model: 'All', storage: 'All', grade: 'All' });

  const models = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.name)))], []);
  const storages = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.storage)))], []);
  const grades = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.grade)))], []);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesText = [p.name, p.storage, p.grade, p.color].join(' ').toLowerCase().includes(query.toLowerCase());
      const modelOk = filters.model === 'All' || p.name === filters.model;
      const storageOk = filters.storage === 'All' || p.storage === filters.storage;
      const gradeOk = filters.grade === 'All' || p.grade === filters.grade;
      return matchesText && modelOk && storageOk && gradeOk;
    });
  }, [query, filters]);

  const whatsappLink = (p) => {
    const text = encodeURIComponent(
      `Hi Shariff, I'm interested in ${p.name} ${p.storage} (${p.grade}, ${p.color}) for ${formatPrice(p.price, currency)}. Is it available?`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <>
      <div className="min-h-screen bg-neutral-950 text-white">
        {/* Navbar */}
        <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" />
              <span className="font-semibold tracking-tight">Shariff Phones</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                <input
                  className="bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Search model, storage, grade…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="hidden sm:inline-flex"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-2xl px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-sm">
                  <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" />WhatsApp</span>
                </button>
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
          <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Premium Refurbished iPhones
                <span className="block text-emerald-400">Fully Tested • Warranty • Best Value</span>
              </h1>
              <p className="mt-4 text-neutral-300">Save up to 40% vs new. Unlocked, battery health checked, 14-day returns, and 6-month warranty as standard.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#catalog" className="rounded-2xl px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-sm">Shop iPhones</a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="rounded-2xl px-4 py-2 bg-neutral-900 border border-neutral-700 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask on WhatsApp
                </a>
              </div>
              <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-neutral-300">
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />6-Month Warranty</li>
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-emerald-400" />Fast Delivery (IE/UK)</li>
                <li className="flex items-center gap-2"><Star className="h-4 w-4 text-emerald-400" />A/A+ Grades</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />14-Day Returns</li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] w-full rounded-3xl bg-neutral-800/50 border border-neutral-700 grid place-items-center">
                <Smartphone className="h-24 w-24 text-neutral-400" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-neutral-900/80 border border-neutral-700 rounded-2xl p-4 text-sm">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" />80-point device check</div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Shop iPhones</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <div className="aspect-[4/5] bg-neutral-800 grid place-items-center">
                  <img src={p.img} alt={`${p.name} ${p.storage}`} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{p.name} · {p.storage}</h3>
                      <p className="text-xs text-neutral-400">Grade {p.grade} · {p.color}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold text-lg">{formatPrice(p.price, currency)}</div>
                      <div className="text-xs line-through text-neutral-500">{formatPrice(p.was, currency)}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <a href={whatsappLink(p)} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <button className="w-full rounded-2xl px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-sm inline-flex items-center justify-center gap-2">
                        <MessageCircle className="h-4 w-4" />Enquire
                      </button>
                    </a>
                    <button className="rounded-2xl px-3 py-2 bg-neutral-800 border border-neutral-700">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-neutral-400 grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 text-white"><Smartphone className="h-4 w-4" /> Shariff Phones</div>
              <p className="mt-2">Dublin, Ireland · Mon–Sat 9:00–18:00</p>
            </div>
            <div>
              <p>WhatsApp: <a className="text-emerald-400" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">+353 85 259 2710</a></p>
              <p>Email: <a className="text-emerald-400" href="mailto:hello@shariffphones.ie">hello@shariffphones.ie</a></p>
            </div>
            <div className="md:text-right">© {new Date().getFullYear()} Shariff Phones. All rights reserved.</div>
          </div>
        </footer>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Shariff, I'm interested in your refurbished iPhones.")}`}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 shadow-lg animate-pulse"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.89 11.89 0 0 0 12.06 0C5.46 0 .09 5.37.09 12c0 2.12.55 4.19 1.6 6.02L0 24l6.15-1.6A12 12 0 0 0 12.06 24c6.6 0 11.97-5.37 11.97-12 0-3.2-1.25-6.21-3.51-8.52Z" />
        </svg>
      </a>
    </>
  );
}
