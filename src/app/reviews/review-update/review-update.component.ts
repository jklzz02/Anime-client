import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ReviewService } from '../../../services/http/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../../interfaces/review';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-review-update',
  standalone: false,
  templateUrl: './review-update.component.html',
  styleUrl: './review-update.component.css',
})
export class ReviewUpdateComponent implements OnInit {
  private reviewId: number | null = null;
  private user: Partial<User> = {};
  review: Partial<Review> = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['signin']);
      return;
    }

    this.route.paramMap.subscribe((params) => {
      const reviewId = params.get('id');
      if (Number.isNaN(Number(reviewId))) {
        this.router.navigate(['not-found']);
        return;
      }
      this.reviewId = Number(reviewId);

      forkJoin({
        user: this.userService.getCurrentUser(),
        review: this.reviewService.getById(this.reviewId),
      }).subscribe({
        next: ({ user, review }) => {
          this.user = user;
          this.review = review;

          if (this.review.user_id !== this.user.id) {
            this.router.navigate(['/error'], {
              queryParams: { status: 401, message: 'Unauthorized' },
            });
            return;
          }
        },
        error: (err) => {
          if (err.status >= 500) {
            this.router.navigate(['/error'], {
              queryParams: { status: err.status, message: err.message },
            });
          }
        },
      });
    });
  }

  updateReview(): void {
    this.reviewService.update(this.review).subscribe({
      next: (updatedReview) => {
        this.router.navigate(['/reviews', updatedReview.id]);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/signin']);
          return;
        }

        if (err.status === 403) {
          this.router.navigate(['/error'], {
            queryParams: { status: 403, message: 'Forbidden' },
          });
          return;
        }

        if (err.status >= 500) {
          this.router.navigate(['/error'], {
            queryParams: { status: err.status, message: err.message },
          });
        }
      },
    });
  }
}
