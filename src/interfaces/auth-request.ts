export interface AuthRequest {
  provider?: string;
  code?: string;
  redirect_uri?: string;
  code_verifier?: string;
  token?: string;
}
