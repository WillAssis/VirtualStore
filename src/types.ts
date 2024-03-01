export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
  quantity: number;
}

export interface User {
  username: string;
  isAdmin: boolean;
}

export interface OrderPageTitle {
  icon: string;
  alt: string;
  message: string;
}
