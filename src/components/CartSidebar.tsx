import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  onCheckout: () => void;
}

export default function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-stone-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-800">Your Cart</h2>
            <p className="text-sm text-stone-500">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-stone-200 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-stone-500 font-medium mb-1">Your cart is empty</p>
              <p className="text-sm text-stone-400">Add some amazing coffee to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-white rounded-xl p-3 border border-stone-100 shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-800 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {item.product.roast} · {item.product.weight}
                    </p>
                    <p className="text-sm font-bold text-amber-700 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-0 border border-stone-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-500 text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-stone-100 transition-colors text-stone-500 text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 p-5 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-stone-500">Subtotal</span>
              <span className="text-sm font-medium text-stone-700">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-stone-500">Shipping</span>
              <span className="text-sm font-medium text-green-600">Free</span>
            </div>
            <div className="flex items-center justify-between mb-4 pt-3 border-t border-stone-100">
              <span className="font-semibold text-stone-800">Total</span>
              <span className="text-xl font-bold text-stone-800">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
