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
