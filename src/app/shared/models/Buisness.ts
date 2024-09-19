import { Address } from './EstablishmentAdress';
import { User } from './User';

export interface Business {
  name: string;
  siren: string;
  logoUrl?: string;
}

export interface Establishment {
  id?: number;
  name: string;
  siret: string;
  email: string;
  phoneNumber: string;
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
