export interface EstablishmentAdress {
  address: {
    streetNumber: number;
    streetName: string;
    zipCode: string;
    city: string;
    latitude: number;
    longitude: number;
  };
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
