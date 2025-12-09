import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '../../services/http/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Anime } from '../../interfaces/anime';
import { UserFavourite, UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { RecommenderService } from '../../services/recommender/recommender.service';
import { AnimeSummary } from '../../interfaces/anime-summary';

@Component({
  selector: 'app-anime-detail',
  standalone: false,
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.css',
})
export class AnimeDetailComponent implements OnInit {
  anime: Anime | any;
  relatedSummaries: AnimeSummary[] = [];
  favourites: UserFavourite[] = [];
  compatibilityScore: number | null = null;
  isLoggedIn: boolean = false;
  isFavourite: boolean = false;

  constructor(
    private title: Title,
    private animeService: AnimeService,
    private recommenderService: RecommenderService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        this.userService.getFavourites().subscribe((favourites) => {
          this.favourites = favourites;
          this.updateFavouriteStatus();
          this.updateCompatibilityScore();
        });
      }
    });

    this.route.paramMap.subscribe((param) => {
      const id: number = Number(param.get('id'));
      this.animeService.getAnimeById(id).subscribe({
        next: (data) => {
          this.anime = data;
          this.title.setTitle('AnimeHub | ' + this.anime.title);
          this.updateFavouriteStatus();
          this.updateCompatibilityScore();
        },
        error: (error) => {
          console.log(error);
          this.router.navigateByUrl('not-found');
        },
      });

      this.recommenderService.getRelated(id, 10).subscribe((data) => {
        this.animeService.getAnimeById(data).subscribe((anime) => {
          this.relatedSummaries = anime as AnimeSummary[];
        });
      });
    });
  }

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  scrollCarousel(direction: number) {
    const container = this.carousel.nativeElement;
    const scrollAmount = container.offsetWidth / 2;

    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  }

  toggleFavourite() {
    if (!this.isLoggedIn) {
      return;
    }

    if (this.isFavourite) {
      this.userService.removeFavourite(this.anime.id).subscribe(() => {
        this.isFavourite = false;
      });
    } else {
      this.userService.addFavourite(this.anime.id).subscribe(() => {
        this.isFavourite = true;
      });
    }
  }

  private updateCompatibilityScore(): void {
    if (this.anime && this.favourites.length > 0) {
      const favouriteIds = this.favourites.map((fav) => fav.anime_id);
      this.recommenderService
        .getCompatibility(this.anime.id, favouriteIds)
        .subscribe((data) => {
          this.compatibilityScore = data.compatibility_score;
        });
    }
  }

  private updateFavouriteStatus(): void {
    if (this.anime && this.favourites.length >= 0) {
      this.isFavourite = this.favourites.some(
        (fav) => fav.anime_id === this.anime.id
      );
    }
  }
}
