export interface Product {
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  establishmentId: string;
  allergens: Allergen[];
}
interface Allergen {
  id: number;
  name: string;
}
