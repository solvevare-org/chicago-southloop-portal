import { MapPin, User, LogOut, ShoppingCart, Search, Menu, Tag, ShoppingBag, Shirt, Box, X } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useState } from 'react';

export function Header() {
  const { cartCount, cartItems, setCurrentPage, isAuthenticated, userName, logout, categories, selectedCategory, setSelectedCategory, setSearchQuery } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const allotment = 999.99;
  const used = 0.0;
  const inCart = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const available = allotment - used - inCart;
  const renewalDate = '02/01/2026';

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue.trim());
    setSelectedCategory(null);
    setCurrentPage('products');
    setSearchOpen(false);
  };

  return (
    <header className="bg-white text-gray-900 shadow-sm">
      {/* compact top bar */}
      <div className=" bg-[#0a3764] px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <span className="font-semibold text-white">{isAuthenticated ? `WELCOME, ${userName?.toUpperCase()}` : 'WELCOME, GUEST'}</span>
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
                <button onClick={() => setCurrentPage('signin')} className="flex items-center gap-1 text-white hover:text-gray-500 transition-colors font-semibold ">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline ">SIGN IN</span>
              </button>
            ) : (
              <>
                <button onClick={() => setCurrentPage('my-account')} className="flex items-center gap-1 text-white hover:text-blue-500 transition-colors font-semibold">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">MY ACCOUNT</span>
                </button>
                <button onClick={() => logout()} className="flex items-center gap-1 text-white hover:text-blue-200 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">SIGN OUT</span>
                </button>
              </>
            )}
            <button
              onClick={() => setCurrentPage('cart')}
              className="flex items-center gap-1 text-white hover:text-blue-200 transition-colors font-semibold"
            >
              <ShoppingCart className="w-4 h-4 " />
              <span>({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between gap-4 px-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('home')} className="hover:opacity-90 transition-opacity flex items-center">
              <img src="/new-logo2.png" alt="Galls logo" className="h-[85px] w-auto object-contain" />
            </button>

            <div className="hidden md:flex items-center gap-3 text-sm text-slate-700">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-xs text-gray-600">CURRENT LOCATION</div>
                <div className="text-blue-700 font-semibold">ADMINISTRATIVE (FT)</div>
              </div>
            </div>
          </div>
          {/* search bar */}

          <div className="flex items-center gap-3 ">
            {/* Desktop / md+ visible styled search bar */}
            <div className="hidden md:block w-[30rem]">
              <form onSubmit={submitSearch} className="relative">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-12 pl-6 pr-16 text-sm rounded-full border-2 border-blue-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white"
                />
                <button type="submit" aria-label="search" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 bg-blue-800 text-white rounded-full flex items-center justify-center shadow">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile: keep compact toggle that opens a small search input */}
            <div className="md:hidden flex items-center gap-2">
              {!searchOpen ? (
                <button onClick={() => setSearchOpen(true)} className="hover:text-blue-700 transition-colors text-slate-700" aria-label="open search">
                  <Search className="w-5 h-5" />
                </button>
              ) : (
                <form onSubmit={submitSearch} className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="px-3 py-1 border rounded-md w-44 text-sm"
                    placeholder="Search..."
                  />
                  <button type="submit" className="px-3 py-1 bg-[#0a3764] text-white rounded-md text-sm">Search</button>
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchValue(''); }} className="text-gray-500 hover:text-gray-700 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              )}
              <button className="p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
            </div>
          </div>

          
   {/* Right side: allotment boxes */}
          <div className="hidden lg:flex items-center gap-4 ml-4">
            <div className="px-4 py-3 bg-sky-50 border-t border-sky-100 text-black rounded-md text-center shadow-md">
              <div className="text-xs text-blue-800 uppercase">ALLOTMENT</div>
              <div className="font-semibold text-sm">${allotment.toFixed(2)}</div>
            </div>
            <div className="px-4 py-3 bg-sky-50 border-t border-sky-100 text-black rounded-md text-center shadow-md">
              <div className="text-xs text-blue-800 uppercase">USED</div>
              <div className="font-semibold text-sm">${used.toFixed(2)}</div>
            </div>
            <div className="px-4 py-3 bg-sky-50 border-t border-sky-100 text-black rounded-md text-center shadow-md">
              <div className="text-xs text-blue-800 uppercase">IN CART</div>
              <div className="font-semibold text-sm">${inCart.toFixed(2)}</div>
            </div>
            <div className="px-4 py-3 bg-blue-800 text-white rounded-md text-center shadow-md">
              <div className="text-xs text-orange-100 uppercase">AVAILABLE</div>
              <div className="font-bold text-sm">${available.toFixed(2)}</div>
            </div>
            <div className="px-4 py-3 bg-sky-50 border-t border-sky-100 text-slate-800 rounded-md text-center shadow-sm">
              <div className="text-xs text-slate-500 uppercase">RENEWAL</div>
              <div className="font-semibold text-sm">{renewalDate}</div>
            </div>
          </div>

         
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-4 border-t border-gray-200">
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <MapPin className="w-4 h-4 text-gray-600" />
              <div>
                <div className="text-xs text-gray-600">CURRENT LOCATION</div>
                <div className="text-blue-600 font-semibold">ADMINISTRATIVE (FT)</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="text-center px-3 py-2 bg-blue-800 rounded- text-white">
                  <div className="text-blue-100 mb-1 text-xs uppercase">ALLOTMENT</div>
                  <div className="font-semibold">${allotment.toFixed(2)}</div>
                </div>
                <div className="text-center px-3 py-2 bg-blue-800 rounded text-white">
                  <div className="text-blue-100 mb-1 text-xs uppercase">USED</div>
                  <div className="font-semibold">${used.toFixed(2)}</div>
                </div>
                <div className="text-center px-3 py-2 bg-blue-800 rounded text-white">
                  <div className="text-blue-100 mb-1 text-xs uppercase">IN CART</div>
                  <div className="font-semibold">${inCart.toFixed(2)}</div>
                </div>
              <div className="text-center px-3 py-2 bg-orange-500 rounded text-white">
                <div className="text-orange-50 mb-1 text-xs uppercase">AVAILABLE</div>
                <div className="font-bold">${available.toFixed(2)}</div>
              </div>
            </div>
            {/* Mobile categories list */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Categories</h4>
              <div className="flex flex-col gap-1">
                <button onClick={() => { setSelectedCategory(null); setCurrentPage('products'); setIsMobileMenuOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-gray-100">All Products</button>
                {categories.map(c => (
                  <button key={c.id} onClick={() => { setSelectedCategory(c.slug); setCurrentPage('products'); setIsMobileMenuOpen(false); }} className="text-left px-3 py-2 rounded hover:bg-gray-100">{c.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className=" bg-[#0a3764]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="text-sm font-semibold text-white hover:text-blue-600 transition-colors"></button>

            {/* Pill-style navigation container */}
            <div className="hidden md:flex items-center gap-0 ml-4 rounded-lg px-2 py-1">
              <button
                onClick={() => { setSelectedCategory(null); setCurrentPage('products'); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition ${selectedCategory === null ? 'bg-white text-slate-800' : 'text-slate-200 hover:text-white'}`}
              >
                HOME
              </button>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCategory(c.slug); setCurrentPage('products'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition ${selectedCategory === c.slug ? 'bg-white text-slate-800' : 'text-slate-200 hover:text-white'}`}
                >
                  {c.name.toUpperCase()}
                </button>
              ))}
            </div>

          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse "></div>
            <span className="hidden sm:inline text-white">EQUIP HOW-TO'S</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
