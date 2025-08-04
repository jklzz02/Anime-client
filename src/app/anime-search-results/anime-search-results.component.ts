import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedAnime } from '../../interfaces/paginated-anime';
import { AnimeService } from '../../services/anime.service';
import { AnimeSummary } from '../../interfaces/anime-summary';
import levenshtein from 'js-levenshtein';

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
  query: string = '';
  anime!: PaginatedAnime | null;
  suggestions: AnimeSummary[] = [];
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const newQuery = params.get('title') ?? '';
      if (this.query !== newQuery) {
        this.query = newQuery;
        this.page = 1;
        this.anime = null;
      }
      this.query = newQuery;
      this.loadAnime(this.query, this.page, this.count);
    });
  }

  loadAnime(query: string, page: number, count: number): void {
    this.notFound = false;

    this.animeService.getAnimeByTitle(query, page, count).subscribe({
      next: (data) => {
        this.anime = data;
        this.page = data.page;
        this.lastPage = data.total_pages;
      },
      error: (err) => {
        if (err.status == 404) {
          this.filterSuggestions(query);
          this.notFound = true;
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

        console.log(filtered, data);
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
    this.loadAnime(this.query, this.page, this.count);
  }

  previousPage(): void {
    this.page--;
    if (this.page < 1) {
      this.page = this.lastPage;
    }
    this.loadAnime(this.query, this.page, this.count);
  }
}
