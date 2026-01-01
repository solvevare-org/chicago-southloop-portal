import { MapPin, User, LogOut, ShoppingCart, Search, Menu } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useState } from 'react';

export function Header() {
  const { cartCount, cartItems, setCurrentPage, isAuthenticated, userName, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const allotment = 999.99;
  const used = 0.0;
  const inCart = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const available = allotment - used - inCart;
  const renewalDate = '02/01/2026';

  return (
    <header className="bg-black text-white shadow-sm">
      {/* compact top bar */}
      <div className="bg-blue-600 px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <span className="font-medium">{isAuthenticated ? `WELCOME, ${userName?.toUpperCase()}` : 'WELCOME, GUEST'}</span>
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <button onClick={() => setCurrentPage('signin')} className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">SIGN IN</span>
              </button>
            ) : (
              <>
                <button onClick={() => setCurrentPage('my-account')} className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">MY ACCOUNT</span>
                </button>
                <button onClick={() => logout()} className="flex items-center gap-1 hover:text-blue-200 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">SIGN OUT</span>
                </button>
              </>
            )}
            <button
              onClick={() => setCurrentPage('cart')}
              className="flex items-center gap-1 hover:text-blue-200 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('home')} className="hover:opacity-90 transition-opacity">
              <div className="logo">GALLS</div>
            </button>

            <div className="hidden md:flex items-center gap-3 text-sm text-gray-300">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-xs">CURRENT LOCATION</div>
                <div className="text-orange-400 font-semibold">ADMINISTRATIVE (FT)</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="chip">
              <div className="text-xs mr-2 text-gray-200">ALLOTMENT</div>
              <div className="font-semibold ml-1">${allotment.toFixed(2)}</div>
            </div>
            <div className="chip">
              <div className="text-xs mr-2 text-gray-200">IN CART</div>
              <div className="font-semibold ml-1">${inCart.toFixed(2)}</div>
            </div>
            <div className="chip bg-orange-600">
              <div className="text-xs mr-2 text-orange-50">AVAILABLE</div>
              <div className="font-bold ml-1">${available.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hover:text-gray-300 transition-colors" aria-label="search">
              <Search className="w-5 h-5" />
            </button>
            <button className="md:hidden hover:text-gray-300 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 px-4 py-4">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">CURRENT LOCATION</div>
                <div className="text-orange-500 font-semibold">ADMINISTRATIVE (FT)</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center px-3 py-2 bg-gray-800 rounded">
                <div className="text-gray-400 mb-1">ALLOTMENT</div>
                <div className="font-semibold">${allotment.toFixed(2)}</div>
              </div>
              <div className="text-center px-3 py-2 bg-gray-800 rounded">
                <div className="text-gray-400 mb-1">USED</div>
                <div className="font-semibold">${used.toFixed(2)}</div>
              </div>
              <div className="text-center px-3 py-2 bg-gray-800 rounded">
                <div className="text-gray-400 mb-1">IN CART</div>
                <div className="font-semibold">${inCart.toFixed(2)}</div>
              </div>
              <div className="text-center px-3 py-2 bg-orange-600 rounded">
                <div className="text-orange-100 mb-1">AVAILABLE</div>
                <div className="font-bold">${available.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm font-semibold">
            <button onClick={() => setCurrentPage('home')} className="hover:text-orange-500 transition-colors">HOME</button>
            <button onClick={() => setCurrentPage('cart')} className="hover:text-orange-500 transition-colors">MY CART</button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="hidden sm:inline text-gray-400">EQUIP HOW-TO'S</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
