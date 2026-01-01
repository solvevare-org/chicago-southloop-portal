import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../store/AppContext';
import { supabase, getSessionId } from '../lib/supabase';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

export function ProductDetailPage() {
  const { selectedProduct, setCurrentPage, refreshCart } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="flex min-h-[calc(100vh-280px)] bg-gray-100 items-center justify-center">
        <p className="text-gray-500">No product selected</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (selectedProduct.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    setAdding(true);
    try {
      const sessionId = getSessionId();
      await supabase.from('cart_items').insert({
        session_id: sessionId,
        product_id: selectedProduct.id,
        quantity,
        size: selectedSize || null,
        color: selectedColor || null,
      });

      await refreshCart();
      setCurrentPage('cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  const specs = selectedProduct.specs as Record<string, string>;

  return (
    <div className="flex min-h-[calc(100vh-280px)] bg-gray-100">
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 p-4 md:p-8">
        <button
          onClick={() => setCurrentPage('products')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {selectedProduct.image_url ? (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Item# {selectedProduct.sku}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {selectedProduct.name}
              </h1>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900">
                  ${selectedProduct.price.toFixed(2)}
                </div>
              </div>

              {selectedProduct.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    COLOR: <span className="font-normal">{selectedColor || 'SELECT A COLOR'}</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SIZE: <span className="font-normal">{selectedSize || 'SELECT A SIZE'}</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-all ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  QUANTITY
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adding ? 'ADDING TO CART...' : 'ADD TO CART'}
              </button>
            </div>
          </div>

          {selectedProduct.description && (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">PRODUCT DETAILS</h2>
              <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
            </div>
          )}

          {Object.keys(specs).length > 0 && (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">PRODUCT SPECS</h2>
              <ul className="space-y-2">
                {Object.entries(specs).map(([key, value]) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="text-gray-700">•</span>
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
