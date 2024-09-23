import { Address } from './EstablishmentAdress';

export interface InfosLinkEstablishment {
  id: number;
  name: string;
  businessName: string;
  logoBusinessUrl: string;
}

export interface Establishment {
  id?: number;
  name: string;
  siret: string;
  email: string;
  phoneNumber: string;
}

export interface EstablishmentWithAddress {
  establishment: Establishment;
  address: Address;
}
