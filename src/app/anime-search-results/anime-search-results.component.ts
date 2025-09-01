import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedAnime } from '../../interfaces/paginated-anime';
import { AnimeService } from '../../services/anime.service';
import { AnimeSummary } from '../../interfaces/anime-summary';
import levenshtein from 'js-levenshtein';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';

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
  counter: number[] = Array(this.count);
  anime!: PaginatedAnime | null;
  suggestions: AnimeSummary[] = [];
  notFound: boolean = false;
  params: AnimeSearchParameters = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const newParams = { ...params } as AnimeSearchParameters;

      this.params = newParams;
      this.anime = null;
      this.page = 1;

      this.loadAnime(this.params, this.page, this.count);
    });
  }

  loadAnime(
    parameters: AnimeSearchParameters,
    page: number,
    count: number
  ): void {
    this.notFound = false;
    window.scrollTo(0, 0);

    this.animeService.searchAnime(parameters, page, count).subscribe({
      next: (data) => {
        this.anime = data;
        this.page = data.page;
        this.lastPage = data.total_pages;
      },
      error: (err) => {
        if (err.status == 404 && parameters.query?.length) {
          this.filterSuggestions(parameters.query);
          this.notFound = true;
        } else {
          this.router.navigate(['error'], {
            queryParams: { status: err.status },
          });
        }
      },
    });
  }

  private filterSuggestions(query: string): void {
    this.animeService.getSummaries(2000).subscribe({
      next: (data) => {
        const filtered = data
          .map((a) => ({
            suggestion: a,
            distance: levenshtein(a.title.toLowerCase(), query.toLowerCase()),
          }))
          .filter((r) => r.distance <= 3)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5);

        this.suggestions = filtered.map((entry) => entry.suggestion);
      },

      error: (err) => console.log(err),
    });
  }

  nextPage(): void {
    this.page++;
    if (this.page > this.lastPage) {
      this.page = 1;
    }
    this.loadAnime(this.params, this.page, this.count);
  }

  previousPage(): void {
    this.page--;
    if (this.page < 1) {
      this.page = this.lastPage;
    }
    this.loadAnime(this.params, this.page, this.count);
  }
}
