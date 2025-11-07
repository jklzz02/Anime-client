export interface AnimeSearchParameters {
  query?: string | null;
  title?: string | null;
  producer_id?: number | null;
  producer?: string | null;
  licensorNames?: string[] | null;
  licensor_id?: number | null;
  licensor?: string | null;
  licensors?: string[] | null;
  genre_id?: number | null;
  genre?: string | null;
  genres?: string[] | null;
  status?: string | null;
  studio?: string | null;
  rating?: string | null;
  episodes?: number | null;
  min_episodes?: number | null;
  max_episodes?: number | null;
  source?: string | null;
  type?: string | null;
  english_title?: string | null;
  min_score?: number | null;
  max_score?: number | null;
  min_release_year?: number | null;
  max_release_year?: number | null;
  include_adult_content?: boolean | null;
  start_date_from?: string | null;
  start_date_to?: string | null;
  end_date_from?: string | null;
  end_date_to?: string | null;
  order_by?: AnimeSortField | null;
  sort_order?: SortOrder | null;
}

type SortOrder = 'asc' | 'desc';
type AnimeSortField =
  | 'title'
  | 'year'
  | 'score'
  | 'type'
  | 'release_date'
  | 'episodes';
