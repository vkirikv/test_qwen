import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { products, Product } from './data/products';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesRoast =
        selectedRoast === 'All' || product.roast === selectedRoast;

      return matchesSearch && matchesCategory && matchesRoast;
    });
  }, [searchQuery, selectedCategory, selectedRoast]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(217, 119, 6, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, rgba(180, 83, 9, 0.2) 0%, transparent 50%)`
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
              Curated with care
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-50 mb-6 leading-tight">
              Exceptional Coffee,{' '}
              <span className="text-amber-400">Delivered Fresh</span>
            </h2>
            <p className="text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              From the world's finest growing regions to your cup. Each bean is 
              carefully sourced, roasted to perfection, and shipped within 24 hours 
              of roasting.
            </p>
            <div className="flex items-center justify-center gap-8 mt-10">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">6+</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider">Origins</p>
              </div>
              <div className="w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">24h</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider">Fresh Roast</p>
              </div>
              <div className="w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">Free</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider">Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          selectedCategory={selectedCategory}
          selectedRoast={selectedRoast}
          onCategoryChange={setSelectedCategory}
          onRoastChange={setSelectedRoast}
          resultCount={filteredProducts.length}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-700 mb-2">No coffees found</h3>
            <p className="text-stone-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☕</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-50">Roast & Bloom</h3>
                <p className="text-xs text-stone-500">Specialty Coffee Roasters</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-stone-400">
              <span>Direct Trade</span>
              <span className="w-1 h-1 bg-stone-600 rounded-full" />
              <span>Small Batch Roasted</span>
              <span className="w-1 h-1 bg-stone-600 rounded-full" />
              <span>Carbon Neutral Shipping</span>
            </div>
            <p className="text-xs text-stone-500">
              © 2026 Roast & Bloom. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartSidebar onCheckout={() => {
        setShowCheckout(true);
      }} />

      {showCheckout && (
        <Checkout onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
