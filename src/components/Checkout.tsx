import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate processing
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl p-12 text-center shadow-2xl max-w-sm w-full">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">Processing Order</h3>
          <p className="text-stone-500 text-sm">Please wait while we confirm your order...</p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">Order Confirmed!</h3>
          <p className="text-stone-500 text-sm mb-2">
            Thank you for your order. Your specialty coffee is on its way.
          </p>
          <p className="text-xs text-stone-400 mb-6">
            Order #RB-{Math.random().toString(36).substr(2, 8).toUpperCase()}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white font-semibold rounded-full transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-100 p-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-800">Checkout</h2>
            <p className="text-sm text-stone-500">{items.length} {items.length === 1 ? 'item' : 'items'} in your order</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-8">
          <div className="md:flex md:gap-8">
            {/* Form Fields */}
            <div className="flex-1 space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-3">Contact</h3>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                />
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-3">Shipping Address</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Street address"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="ZIP"
                      required
                      value={formData.zip}
                      onChange={(e) => handleChange('zip', e.target.value)}
                      className="w-28 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-3">Payment</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card number"
                    required
                    value={formData.card}
                    onChange={(e) => handleChange('card', e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={formData.expiry}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                      className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      value={formData.cvv}
                      onChange={(e) => handleChange('cvv', e.target.value)}
                      className="w-28 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:w-72 mt-8 md:mt-0">
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100 sticky top-24">
                <h3 className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-stone-700 truncate">{item.product.name}</p>
                        <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-stone-700">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Subtotal</span>
                    <span className="text-stone-700">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-800 pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-5 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Place Order
                </button>
                <p className="text-[10px] text-stone-400 text-center mt-3">
                  This is a simulated checkout. No real payment will be processed.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
