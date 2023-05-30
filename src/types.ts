export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  destaque: boolean;
}
