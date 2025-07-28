import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Anime } from '../../interfaces/anime';

@Component({
  selector: 'app-anime-detail',
  standalone: false,
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.css',
})
export class AnimeDetailComponent implements OnInit {
  anime: Anime | any;

  constructor(
    private title: Title,
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id: number = Number(param.get('id'));
      this.animeService.getAnimeById(id).subscribe(
        (data) => {
          this.anime = data;
          this.title.setTitle(this.anime.title);
        },
        (error) => {
          console.log(error);
          this.router.navigateByUrl('not-found');
        }
      );
    });
  }
}
