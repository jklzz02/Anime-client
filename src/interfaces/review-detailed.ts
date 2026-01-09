import { AnimeSummary } from './anime-summary';
import { PublicUser } from './public-user';

export interface ReviewDetailed {
  id: number;
  title: string;
  content: string;
  score: number;
  anime_id: number;
  user_id: number;
  created_at: string;
  user: PublicUser;
  anime: AnimeSummary;
}
