export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  featured: boolean;
}

export interface CartItem {
  _id: string;
  name: string;
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

export interface Order {
  _id: string;
  orderedBy: string;
  total: number;
  products: [{ _id: string; product: Product; quantity: number }];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface HTTPProductsResponse {
  products: Product[];
  results?: number;
  pages?: number;
  currentPage?: number;
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

export interface HTTPUpdateProductResponse {
  success: boolean;
  errors: {
    nameError: string;
    descriptionError: string;
    priceError: string;
  };
}

export interface HTTPCreateOrderResponse {
  success: boolean;
  error: string;
  order: Order | null;
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

export interface ThemeContextType {
  theme: 'light' | 'dark';
  changeTheme: () => void;
}
