import { Link } from '../models/Link.model';

export const publicLinks: Link[] = [
  { route: '/login', text: 'Connexion', icon: 'login' },
  { route: '/register', text: 'Créer un compte', icon: 'person_add' },
];
export const userLinks: Link[] = [
  { route: '/reservations', text: 'Mes réservations', icon: 'food_bank' },
  { route: '/map', text: 'Carte', icon: 'map' },
  { route: '/profile', text: 'Profil', icon: 'person' },
  { route: '/logout', text: 'Déconnexion', icon: 'logout' },
];
