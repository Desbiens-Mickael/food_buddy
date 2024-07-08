import { Allergen } from './Allergen';

export interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  type: string;
  status: string;
}

export interface CreateProduct extends Product {
  allergensIds: number[];
}

export interface FullProduct extends Product {
  id: string;
  allergens: Allergen[];
  number_available: number;
  createdAt: Date;
  updatedAt: Date;
}
