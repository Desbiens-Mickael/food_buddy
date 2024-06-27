import { User } from './User';

export interface Business {
  name: string;
  siren: string;
}

export interface Establishment {
  name: string;
  siret: string;
  email: string;
  phoneNumber: string;
}

export interface Address {
  streetNumber: string;
  streetName: string;
  zipCode: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface Buisness {
  newUser: User;
  business: Business;
  establishment: Establishment;
  address: Address;
}

export { User };
