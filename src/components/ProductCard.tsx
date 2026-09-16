import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addToCart } = useCart();

  const getRoastColor = (roast: string) => {
    switch (roast) {
      case 'Light':
        return 'bg-amber-100 text-amber-800';
      case 'Medium-Light':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-orange-200 text-orange-900';
      case 'Dark':
        return 'bg-stone-700 text-stone-100';
      default:
        return 'bg-stone-200 text-stone-800';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-stone-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div
        className="relative h-52 sm:h-56 overflow-hidden cursor-pointer"
        onClick={() => onSelect(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${getRoastColor(product.roast)}`}>
          {product.roast} Roast
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-stone-700 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-serif text-lg font-bold text-stone-800 cursor-pointer hover:text-amber-700 transition-colors leading-tight"
            onClick={() => onSelect(product)}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-stone-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-stone-500 mb-3">{product.origin} · {product.weight}</p>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100"
            >
              {note}
            </span>
          ))}
          {product.notes.length > 3 && (
            <span className="px-2 py-0.5 text-stone-400 text-xs">
              +{product.notes.length - 3}
            </span>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-stone-800">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-amber-700 text-white text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
