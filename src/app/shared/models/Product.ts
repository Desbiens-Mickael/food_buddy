import { Alergen } from './Alergen';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  alergen: Alergen[];
}
