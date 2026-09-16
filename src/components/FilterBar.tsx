import { categories, roasts } from '../data/products';

interface FilterBarProps {
  selectedCategory: string;
  selectedRoast: string;
  onCategoryChange: (category: string) => void;
  onRoastChange: (roast: string) => void;
  resultCount: number;
}

export default function FilterBar({
  selectedCategory,
  selectedRoast,
  onCategoryChange,
  onRoastChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="mb-8">
      {/* Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold mr-1">Type:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-stone-800 text-amber-50 shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold mr-1">Roast:</span>
          {roasts.map((roast) => (
            <button
              key={roast}
              onClick={() => onRoastChange(roast)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedRoast === roast
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-100'
              }`}
            >
              {roast}
            </button>
          ))}
        </div>
      </div>

      {/* Result Count */}
      <p className="text-sm text-stone-500">
        Showing <span className="font-semibold text-stone-700">{resultCount}</span>{' '}
        {resultCount === 1 ? 'coffee' : 'coffees'}
      </p>
    </div>
  );
}
