export interface Reservation {
  id: string;
  establishmentname: string;
  productname: string;
  validUntil: Date;
  createdAt: Date;
  validationCode: string;
}
