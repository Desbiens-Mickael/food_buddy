import { User } from './User';

export interface Business {
  name: string;
  siren: string;
  logoUrl?: string;
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

export interface BusinessAccount {
  newUser: User;
  business: Business;
  establishment: Establishment;
  address: Address;
}

export interface fullBusiness {
  id: string;
  name: string;
  siren: string;
  logoUrl: string;
  establishments: Establishment[];
}

export interface BusinessWithEstablishment {
  Business: fullBusiness[];
}
