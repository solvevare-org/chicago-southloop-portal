import { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ArrowLeft } from 'lucide-react';

export function CheckoutPage() {
  const { cartItems, setCurrentPage } = useApp();
  const [formData, setFormData] = useState({
    firstName: 'Karl',
    lastName: 'Kuester',
    email: 'kkuester@department.com',
    phone: '(847) 897-7443',
    ext: '815',
    address: '2126 POINT BLVD. UNIT 200, ELGIN IL, 60123-7656',
    shippingMethod: 'Ground - Best Way Standard',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 8.0;
  const taxes = 6.19;
  const total = subtotal + shipping + taxes;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! (This is a demo)');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-100 p-4 md:p-8">
      <button
        onClick={() => setCurrentPage('cart')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to Cart</span>
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">SECURE CHECKOUT</h1>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            CONTINUE TO PAY METHOD
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-8">
          Need help? <button className="text-blue-600 hover:underline">Email us</button> any time.
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">ORDER INFORMATION</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    * First Name:
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    * Last Name:
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    * Phone Number:
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ext:</label>
                  <input
                    type="text"
                    value={formData.ext}
                    onChange={e => setFormData({ ...formData, ext: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 mb-4">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Service Center Pickup:</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    * Shipping Address:
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    Add New Shipping Address
                  </button>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    * Shipping Method:
                  </label>
                  <select
                    value={formData.shippingMethod}
                    onChange={e => setFormData({ ...formData, shippingMethod: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option>Ground - Best Way Standard</option>
                    <option>Express - 2 Day</option>
                    <option>Next Day Air</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage('cart')}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Update Items
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  CONTINUE TO PAY METHOD
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">ITEMS</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-sm font-semibold text-gray-700">
                      <th className="text-left py-3">ITEMS</th>
                      <th className="text-right py-3">ITEM PRICE</th>
                      <th className="text-center py-3">QTY</th>
                      <th className="text-right py-3">TOTAL PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                              {item.product.image_url ? (
                                <img
                                  src={item.product.image_url}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover rounded"
                                />
                              ) : (
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                              )}
                            </div>
                            <div className="text-sm">
                              <div className="font-semibold text-blue-600 mb-1">
                                {item.product.name}
                              </div>
                              <div className="text-gray-600">Item#: {item.product.sku}</div>
                              {item.color && (
                                <div className="text-gray-600">
                                  COLOR: <span className="uppercase">{item.color}</span>
                                </div>
                              )}
                              {item.size && (
                                <div className="text-gray-600">
                                  SIZE: <span className="uppercase">{item.size}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-right font-semibold">
                          ${item.product.price.toFixed(2)}
                        </td>
                        <td className="text-center font-semibold">{item.quantity}</td>
                        <td className="text-right font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchandise Total</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total After Taxes</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                CONTINUE TO PAY METHOD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
