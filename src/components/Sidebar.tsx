import { useApp } from '../store/AppContext';
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Tag,
  MapPin,
  ShoppingBag,
  Zap,
  Shirt,
  CornerUpLeft,
  Truck,
} from 'lucide-react';

// Small mapping from category slug -> icon component
const ICON_MAP: Record<string, any> = {
  belts: Tag,
  footwear: ShoppingBag,
  jackets: Shirt,
  shirts: Shirt,
  trousers: Box,
  default: Box,
};

export function Sidebar() {
  const { categories, selectedCategory, setSelectedCategory, setCurrentPage } = useApp();
  const [isOpen] = useState(true);
  const asideRef = useRef<HTMLDivElement | null>(null);
  const [fixedStyle, setFixedStyle] = useState<null | { left: number; width: number; bottom: number }>(null);

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    setCurrentPage('products');
  };

  const items = [{ id: 'all', name: 'All Products', slug: null }, ...categories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))];

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || !asideRef.current) return;

    const computeRect = () => {
      const r = asideRef.current!.getBoundingClientRect();
      return { left: r.left, width: r.width };
    };

    const onResize = () => {
      if (fixedStyle && asideRef.current) {
        const r = computeRect();
        setFixedStyle({ left: r.left, width: r.width, bottom: fixedStyle.bottom });
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!asideRef.current) return;
      const r = computeRect();
      if (e.isIntersecting) {
        // footer is visible: fix sidebar above footer
        const footerRect = e.boundingClientRect as DOMRect;
        const bottom = window.innerHeight - footerRect.top + 16; // 16px gap
        setFixedStyle({ left: r.left, width: r.width, bottom });
      } else {
        // footer not visible: clear fixed style (use sticky)
        setFixedStyle(null);
      }
    }, { root: null, threshold: 0 });

    observer.observe(footer);
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [fixedStyle, categories]);

  return (
    <aside ref={asideRef} className="w-full md:w-56 flex-shrink-0">
      <div
        className={fixedStyle ? undefined : 'sticky top-12 self-start' }
        style={
          fixedStyle
            ? { position: 'fixed', left: fixedStyle.left, width: fixedStyle.width, bottom: fixedStyle.bottom, zIndex: 40 }
            : undefined
        }
      >
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden ">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700">Categories</h4>
            </div>
          </div>

          <nav className="max-h-[calc(100vh-3rem)] overflow-auto">
            <ul className="flex flex-col">
              {items.map(it => {
                const active = selectedCategory === it.slug;
                const Icon = it.slug ? ICON_MAP[it.slug.toLowerCase()] ?? ICON_MAP.default : CornerUpLeft;
                return (
                  <li key={it.id} className="last:border-b-0">
                    <button
                      onClick={() => handleCategoryClick(it.slug)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition ${
                        active ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                      }`}
                    >
                      <span className={`w-9 h-9 flex items-center justify-center rounded-md ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
                        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-700'}`} />
                      </span>
                      <span className="font-medium">{it.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
