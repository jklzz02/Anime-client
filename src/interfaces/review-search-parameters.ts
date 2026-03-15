export interface ReviewSearchParameters {
  title?: string | null;
  anime_id?: number | null;
  anime_title?: string | null;
  user_id?: number | null;
  user_name?: string | null;
  from?: string | null;
  to?: string | null;
  min_score?: number | null;
  max_score?: number | null;
  oder_by?: ReviewSortField | null;
  sort_order?: 'asc' | 'desc' | null;
}

export type ReviewSortField = 'id' | 'title' | 'score' | 'date';
