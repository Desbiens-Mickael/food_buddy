export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  establishmentId: number;
  allergensIds: number[];
}
