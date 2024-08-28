import { Link } from '../models/Link.model';

export const publicRoutes: Link[] = [
  { route: '/login', text: 'Connexion', icon: 'login' },
  { route: '/register', text: 'Créer un compte', icon: 'person_add' },
];

export const userRoutes: Link[] = [
  { route: '/map', text: 'Carte', icon: 'map' },
  { route: '/profile', text: 'Profil', icon: 'person' },
];

export const eligibleRoutes: Link[] = [
  { route: '/reservations', text: 'Repas suspendus', icon: 'food_bank' },
];
