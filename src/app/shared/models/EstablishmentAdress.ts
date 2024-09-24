import { Establishment } from './Establishment';

export interface Address {
  id?: number;
  streetNumber: number;
  streetName: string;
  zipCode: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface EstablishmentAdress {
  address: Address;
  establishment: Establishment;
  business: {
    id: number;
    name: string;
    logoUrl: string;
  };
}
