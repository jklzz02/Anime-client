import { Anime } from './anime';

export interface ScoredAnime {
  anime: Partial<Anime>;
  score: number;
}
