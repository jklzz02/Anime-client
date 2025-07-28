import { Anime } from './anime';

export interface PaginatedAnime {
  page: number;
  result_count: number;
  page_size: number;
  total_pages: number;
  total_items: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  has_items: boolean;
  data: Anime[];
}
