export interface CacheHealthResponse {
  hits: number;
  misses: number;
  hit_ratio: number;
  entries_count: number;
  eviction_count: number;
  estimated_unit_size: number;
  max_unit_cache_size: number;
  capacity_used_percent: number;
  state: 'empty' | 'under_pressure' | 'ineffective' | 'healthy';
}
