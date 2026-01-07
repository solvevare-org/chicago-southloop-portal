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

// Sidebar removed - category navigation moved into Header.
// Keep a no-op export so legacy imports don't crash. If you want the old
// sidebar behavior back, restore the original implementation from git history.
export function Sidebar() {
  return null;
}
