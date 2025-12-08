export interface HybridReccomendationRequest {
  user_anime_list: number[];
  limit: number;
  cf_weight: number;
  content_weight: number;
}
