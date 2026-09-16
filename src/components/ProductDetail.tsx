import { useState } from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setTimeout(() => setIsCartOpen(true), 200);
  };

  const getRoastIndicator = (roast: string) => {
    const levels = ['Light', 'Medium-Light', 'Medium', 'Dark'];
    const index = levels.indexOf(roast);
    return (
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-6 h-2 rounded-full transition-colors ${
              i <= index ? 'bg-amber-700' : 'bg-stone-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
        >
          <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-full md:min-h-[480px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover md:rounded-l-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:rounded-l-3xl" />
            </div>
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 bg-stone-100 text-stone-600 text-xs font-medium rounded-full">
                  {product.weight}
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-800 mb-1">
                {product.name}
              </h2>
              <p className="text-amber-700 font-medium mb-4">{product.origin}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-stone-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-stone-500">{product.rating} / 5.0</span>
              </div>

              {/* Roast Level */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">Roast Level</p>
                <div className="flex items-center gap-3">
                  {getRoastIndicator(product.roast)}
                  <span className="text-sm font-medium text-stone-700">{product.roast}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Flavor Notes */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">Tasting Notes</p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1.5 bg-amber-50 text-amber-800 text-sm rounded-full border border-amber-100 font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="border-t border-stone-100 pt-5 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-stone-500">Price</p>
                  <p className="text-2xl font-bold text-stone-800">${product.price.toFixed(2)}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-0 border border-stone-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-stone-800 hover:bg-amber-700 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              >
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
