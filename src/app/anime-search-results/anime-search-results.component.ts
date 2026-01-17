import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginatedResult } from '../../interfaces/paginated-result';
import { AnimeService } from '../../services/http/anime.service';
import { AnimeSummary } from '../../interfaces/anime-summary';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';
import { Anime } from '../../interfaces/anime';

@Component({
  selector: 'app-anime-search-results',
  standalone: false,
  templateUrl: './anime-search-results.component.html',
  styleUrls: ['./anime-search-results.component.css'],
})
export class AnimeSearchResultsComponent implements OnInit {
  page: number = 1;
  lastPage: number = 1;
  count: number = 33;
  counter: number[] = Array(this.count).fill(0);

  anime: PaginatedResult<Anime> | null = null;
  suggestions: AnimeSummary[] = [];
  notFound = false;

  params: AnimeSearchParameters = {
    genres: [],
    producers: [],
    licensors: [],
    order_by: 'score',
    sort_order: 'desc',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = this.parseQueryParams(params);
      this.anime = null;

      this.page = params['page'] ? Number(params['page']) : 1;

      if (this.page <= 0) {
        this.page = 1;
      }

      this.loadAnime(this.params, this.page, this.count);
    });
  }

  loadAnime(
    parameters: AnimeSearchParameters,
    page: number,
    count: number,
  ): void {
    this.notFound = false;

    this.animeService.searchAnime(parameters, page, count).subscribe({
      next: (data) => {
        this.anime = data;
        this.page = data.page;
        this.lastPage = data.total_pages;
      },
      error: (err) => {
        if (err.status === 404 && parameters.query) {
          this.notFound = true;
        } else {
          this.router.navigate(['error'], {
            queryParams: { status: err.status },
          });
        }
      },
    });
  }

  nextPage(): void {
    const nextPageNumber: number =
      this.page + 1 > this.lastPage ? 1 : this.page + 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: nextPageNumber },
      queryParamsHandling: 'merge',
    });
  }

  previousPage(): void {
    const prevPageNumber: number =
      this.page - 1 <= 0 ? this.lastPage : this.page - 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: prevPageNumber },
      queryParamsHandling: 'merge',
    });
  }

  private parseQueryParams(params: Params): AnimeSearchParameters {
    const asArray = (value?: string | string[]) =>
      Array.isArray(value) ? value : value ? [value] : [];

    const asNumber = (value?: string) =>
      value !== undefined ? Number(value) : undefined;

    const asBoolean = (value?: string) => value === 'true';

    return {
      query: params['query'] ?? undefined,

      genres: asArray(params['genres']),
      producers: asArray(params['producers']),
      licensors: asArray(params['licensors']),

      genre_id: asNumber(params['genre_id']),
      producer_id: asNumber(params['producer_id']),
      licensor_id: asNumber(params['licensor_id']),

      studio: params['studio'],
      status: params['status'] ?? undefined,
      type: params['type'] ?? undefined,
      source: params['source'] ?? undefined,

      min_score: asNumber(params['min_score']),
      max_score: asNumber(params['max_score']),

      min_release_year: asNumber(params['min_release_year']),
      max_release_year: asNumber(params['max_release_year']),

      min_episodes: asNumber(params['min_episodes']),
      max_episodes: asNumber(params['max_episodes']),

      start_date_from: params['start_date_from'] ?? undefined,
      start_date_to: params['start_date_to'] ?? undefined,
      end_date_from: params['end_date_from'] ?? undefined,
      end_date_to: params['end_date_to'] ?? undefined,

      order_by: params['order_by'] ?? undefined,
      sort_order: params['sort_order'] ?? undefined,

      include_adult_content: asBoolean(params['include_adult_content']),
    };
  }
}
