export interface HealthCheckResponse {
  entries: Entries;
  status: number;
  totalDuration: string;
}

export interface Entries {
  CacheHealthCheck: ApiCacheHealthCheck;
  RecommenderHealthCheck: RecommenderHealthCheck;
}

export interface ApiCacheHealthCheck {
  data: ApiCacheData;
  description: string;
  duration: string;
  exception: any;
  status: number;
  tags: any[];
}

export interface ApiCacheData {
  hits: number;
  misses: number;
  hit_ratio: number;
  entries_count: number;
  estimated_unit_size: number;
  max_unit_size: number;
  capacity_used_percent: number;
  eviction_count: number;
  state: number;
}

export interface RecommenderHealthCheck {
  data: RecommenderData;
  description: string;
  duration: string;
  exception: any;
  status: number;
  tags: any[];
}

export interface RecommenderData {
  version: number;
  service_status: string;
  anime_loader: AnimeLoader;
  dataset_status: RecommenderFileStatus[];
}

export interface AnimeLoader {
  is_loaded: boolean;
  has_error: boolean;
  anime_count: number;
  error_message: string;
  cache: AnimeLoaderCacheStatus;
}

export interface AnimeLoaderCacheStatus {
  hits: number;
  misses: number;
  size: number;
  max_size: number;
}

export interface RecommenderFileStatus {
  file: string;
  status: string;
}
