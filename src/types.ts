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

export interface HTTPProductsResponse {
  products: Product[];
  results: number;
  pages: number;
  currentPage: number;
}

export interface HTTPLoginResponse {
  success: boolean;
  user: User | null;
  errors: {
    usernameError: string;
    passwordError: string;
  };
}

export interface HTTPRegisterResponse {
  success: boolean;
  user: User | null;
  errors: {
    usernameError: string;
    emailError: string;
    passwordError: string;
  };
}

export interface AuthContextType {
  user: User | null;
  status: 'idle' | 'fetching' | 'saving';
  login: (username: string, password: string) => Promise<HTTPLoginResponse>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<HTTPRegisterResponse>;
}
