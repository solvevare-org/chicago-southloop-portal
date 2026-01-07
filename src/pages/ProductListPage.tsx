import { useEffect, useState } from 'react';
import { useApp } from '../store/AppContext';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

export function ProductListPage() {
  const { selectedCategory, setSelectedProduct, setCurrentPage, categories, searchQuery } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*');
    if (selectedCategory) {
      const category = categories.find(c => c.slug === selectedCategory);
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    if (searchQuery && searchQuery.trim().length > 0) {
      query = query.ilike('name', `%${searchQuery}%`);
    }

    const { data } = await query.order('name');
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const categoryName = selectedCategory
    ? categories.find(c => c.slug === selectedCategory)?.name || 'Products'
    : 'All Products';

  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-100">
      <main className="max-w-7xl mx-auto flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {categoryName.toUpperCase()}
          </h1>
          <p className="text-gray-600">{products.length} Results</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.sku}</div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.sizes.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {product.sizes.length} sizes
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
