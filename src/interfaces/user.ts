export interface User {
  id: number;
  email: string;
  username: string;
  profile_picture: string;
  created_at: string;
  admin: boolean;
  identity_provider: IdentityProvider;
}

export interface IdentityProvider {
  id: number;
  name: string;
}
