export interface CompatibleAnimeResponse {
  data: ScoredAnime[];
  scale: string;
}

export interface ScoredAnime {
  anime_id: number;
  compatibility_score: number;
}
