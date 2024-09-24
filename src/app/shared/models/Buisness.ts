import { Establishment } from './Establishment';
import { Address } from './EstablishmentAdress';
import { User } from './User';

export interface Business {
  name: string;
  siren: string;
  logoUrl?: string;
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
