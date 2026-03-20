import { AnimeSortField } from './anime-search-parameters';

export interface AnimeTargetParameters {
  target_anime_ids: number[];
  order_by: AnimeSortField;
  sort_order: 'asc' | 'desc';
  include_adult_content: boolean;
}
