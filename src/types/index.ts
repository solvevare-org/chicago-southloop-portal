export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  image_url: string;
  specs: Record<string, unknown>;
  sizes: string[];
  colors: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string | null;
  color: string | null;
}

export type Page =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'signin'
  | 'forgot-password'
  | 'request-account';
