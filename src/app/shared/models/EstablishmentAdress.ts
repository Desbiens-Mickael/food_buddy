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
  establishment: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  };
  business: {
    id: number;
    name: string;
    logoUrl: string;
  };
}
