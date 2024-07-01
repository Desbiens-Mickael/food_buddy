export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isEligible?: boolean;
  createdAt?: Date;
  updateAt?: Date;
}
interface Consomation {
  drink?: boolean;
  meal?: boolean;
  dessert?: boolean;
}

export interface UserWithConsomation extends User, Consomation {}
