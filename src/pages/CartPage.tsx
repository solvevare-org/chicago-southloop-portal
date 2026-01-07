import { useApp } from '../store/AppContext';
import { supabase } from '../lib/supabase';
import { Trash2 } from 'lucide-react';

export function CartPage() {
  const { cartItems, refreshCart, setCurrentPage } = useApp();

  const handleRemoveItem = async (itemId: string) => {
    await supabase.from('cart_items').delete().eq('id', itemId);
    await refreshCart();
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await supabase.from('cart_items').update({ quantity: newQuantity }).eq('id', itemId);
    await refreshCart();
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-100">
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">SHOPPING CART</h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600 mb-4">
                  Need help? <button className="text-blue-600 hover:underline">Email us</button> any time.
                </p>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <button
                  onClick={() => setCurrentPage('products')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 text-blue-600">{item.product.name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Item#: <span className="font-semibold">{item.product.sku}</span></div>
                          {item.color && (
                            <div>Color: <span className="font-semibold uppercase">{item.color}</span></div>
                          )}
                          {item.size && (
                            <div>Size: <span className="font-semibold uppercase">{item.size}</span></div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            REMOVE
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">ITEM PRICE</div>
                          <div className="text-xl font-bold">${item.product.price.toFixed(2)}</div>
                        </div>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">TOTAL PRICE</div>
                          <div className="text-xl font-bold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setCurrentPage('products')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => setCurrentPage('checkout')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="lg:w-80">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                <h2 className="text-xl font-bold mb-4">ORDER SUMMARY</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items in Cart</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Units</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg">
                    <span className="font-bold">Merchandise Total</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('checkout')}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
