import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { PaginatedAnime } from '../../interfaces/paginated-anime';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-anime',
  standalone: false,
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css',
})
export class AnimeComponent implements OnInit {
  anime: PaginatedAnime | any;
  page: number = 1;

  constructor(
    private title: Title,
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const paramPage = Number(param.get('page'));
      this.page = !Number.isNaN(paramPage) && paramPage > 0 ? paramPage : 1;
      this.title.setTitle('Anime page ' + this.page);
      this.loadAnime();
    });
  }

  loadAnime() {
    this.animeService
      .getPaginatedAnime(this.page, 33)
      .subscribe((data) => (this.anime = data));
  }

  nextPage() {
    if (!this.anime.has_next_page) {
      this.page = 1;
    } else {
      this.page++;
    }

    this.router.navigateByUrl(`explore/${this.page}`);
  }

  previousPage() {
    if (!this.anime.has_previous_page) {
      this.page = this.anime.total_pages;
    } else {
      this.page--;
    }

    this.router.navigateByUrl(`explore/${this.page}`);
  }
}
