import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/http/review.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { Review } from '../../../interfaces/review';
import { AnimeListItem } from '../../../interfaces/anime-list-item';

@Component({
  selector: 'app-review-create',
  standalone: false,
  templateUrl: './review-create.component.html',
  styleUrl: './review-create.component.css',
})
export class ReviewCreateComponent implements OnInit {
  review: Partial<Review> = {};
  isValid: boolean = false;
  selectedAnime: Partial<AnimeListItem> = {};
  errors: Map<string, string[]> = new Map<string, string[]>();

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.review.user_id = user.id;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.router.navigate(['/signin']);
      },
    });
  }

  onAnimeSelected(anime: AnimeListItem): void {
    this.selectedAnime = anime;
    this.review.anime_id = anime.id;
    this.updateValidity();
  }

  updateValidity(): void {
    this.isValid =
      !!this.review.title &&
      !!this.review.content &&
      !!this.review.anime_id &&
      !!this.review.score;
  }

  onSubmit(): void {
    this.review.created_at = new Date().toISOString();
    this.review.anime_id = this.selectedAnime.id;
    this.reviewService.create(this.review).subscribe({
      next: (createdReview) => {
        this.router.navigate(['/review', createdReview.id]);
      },
      error: (err) => {
        if (err.status === 400) {
          this.errors = new Map(Object.entries(err.error));
          return;
        }

        if (err.status === 401) {
          this.router.navigate(['/signin']);
          return;
        }

        this.router.navigate(['/error'], {
          queryParams: { status: err.status, message: err.message },
        });
      },
    });
  }
}
