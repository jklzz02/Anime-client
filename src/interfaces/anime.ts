export interface Anime {
  id: number;
  title: string;
  english_title: string;
  other_title: string;
  synopsis: string;
  background: string;
  status: string;
  image_url: string;
  type: Type;
  episodes: number;
  duration: string;
  source: Source;
  release_year: number;
  started_airing: string;
  finished_airing: string;
  rating: string;
  studio: string;
  score: number;
  trailer_url: string;
  trailer_embed_url: string;
  trailer_image_url: string;
  genres: Genre[];
  licensors: Licensor[];
  producers: Producer[];
}

export interface Type {
  id: number;
  name: string;
}

export interface Source {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Licensor {
  id: number;
  name: string;
}

export interface Producer {
  id: number;
  name: string;
}
