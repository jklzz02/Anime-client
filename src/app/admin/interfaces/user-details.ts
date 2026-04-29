export interface UserDetails {
  user: User;
  reviews: Review[];
  ban: Ban[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
  created_at: string;
  admin: boolean;
  identity_provider: IdentityProvider;
}

export interface IdentityProvider {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  title: string;
  content: string;
  score: number;
  anime_id: number;
  user_id: number;
  created_at: string;
}

export interface Ban {
  id: number;
  user_id: number;
  normalized_email: string;
  created_at: string;
  expiration_date: string;
  reason: string;
  version: number;
  active: boolean;
}
