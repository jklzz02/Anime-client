import { Anime } from './anime';
import { AnimeSummary } from './anime-summary';

export interface ScoredAnime {
  anime: Anime;
  score: number;
}

export interface ScoredSummary {
  summary: AnimeSummary;
  score: number;
}
