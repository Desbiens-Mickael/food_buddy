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
  ProductImage?: File;
}

export interface FullProduct extends Product {
  id: string;
  allergens: Allergen[];
  numberAvailable: number;
  numberReservations: number;
  establishmentId: string;
  createdAt: Date;
  updatedAt: Date;
}
