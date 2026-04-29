import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '../../../services/http/anime/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Anime } from '../../../interfaces/anime';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { RecommenderService } from '../../../services/recommender/recommender.service';
import { AnimeSummary } from '../../../interfaces/anime-summary';
import { UserFavourite } from '../../../interfaces/user-favourite';
import { AnimeListItem } from '../../../interfaces/anime-list-item';

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
    private auth: AuthService,
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
          this.title.setTitle('AnimeHQ | ' + this.anime.title);
          this.updateFavouriteStatus();
          this.updateCompatibilityScore();
        },
        error: (error) => {
          this.router.navigateByUrl('not-found');
        },
      });

      this.recommenderService.getRelated(id, 10).subscribe((data) => {
        this.relatedSummaries = data;
      });
    });
  }

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  toCreateReview(): void {
    const listItem: AnimeListItem = {
      id: this.anime.id,
      title: this.anime.title,
      english_title: this.anime.english_title,
      image_url: this.anime.image_url,
    };

    this.router.navigate(['/reviews/create'], {
      state: {
        anime: listItem,
      },
    });
  }

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
      this.recommenderService
        .getCompatibility(this.anime.id)
        .subscribe((data) => {
          this.compatibilityScore = data.compatibility_score;
        });
    }
  }

  private updateFavouriteStatus(): void {
    if (this.anime && this.favourites.length >= 0) {
      this.isFavourite = this.favourites.some(
        (fav) => fav.anime_id === this.anime.id,
      );
    }
  }
}
