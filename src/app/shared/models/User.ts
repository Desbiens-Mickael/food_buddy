export interface UpdateUser {
  firstname: string;
  lastname: string;
  email: string;
  profileImageUrl?: string;
}

export interface User extends UpdateUser {
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
