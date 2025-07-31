import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedAnime } from '../../interfaces/paginated-anime';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-anime-search-results',
  standalone: false,
  templateUrl: './anime-search-results.component.html',
  styleUrl: './anime-search-results.component.css',
})
export class AnimeSearchResultsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService
  ) {}

  page: number = 1;
  lastPage: number = 1;
  query: string = '';
  anime!: PaginatedAnime;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('title') ?? '';
      this.loadAnime(this.query, this.page);
    });
  }

  loadAnime(query: string, page: number) {
    this.animeService.getAnimeByTitle(query, page, 33).subscribe((data) => {
      this.anime = data;
      this.page = this.anime.page;
      this.lastPage = data.total_pages;
    });
  }

  nextPage(): void {
    this.page++;
    if (this.page >= this.lastPage) {
      this.page = 1;
    }

    this.loadAnime(this.query, this.page);
  }
  previousPage(): void {
    this.page--;
    if (this.page <= 1) {
      this.loadAnime(this.query, this.lastPage);
    }

    this.loadAnime(this.query, this.page);
  }
}
