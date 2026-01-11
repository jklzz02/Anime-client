import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewDetailed } from '../../../interfaces/review-detailed';
import { ReviewService } from '../../../services/http/review.service';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-review-detail',
  standalone: false,
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.css',
})
export class ReviewDetailComponent implements OnInit {
  review: ReviewDetailed | null = null;
  loading: boolean = true;
  error: boolean = false;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (Number.isNaN(id) || id <= 0) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.loading = true;
      this.error = false;

      this.reviewService.getDetailedById(id).subscribe({
        next: (data) => {
          this.review = data;
          this.loading = false;

          if (this.authService.isAuthenticated()) {
            this.userService.getCurrentUser().subscribe({
              next: (user: User) => {
                this.isOwner = user.id === this.review?.user_id;
              },
            });
          }
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          } else {
            this.error = true;
            if (err.status >= 500 || err.status == 0) {
              this.router.navigate(['/error'], {
                queryParams: { status: err.status },
              });
            }
          }
        },
      });
    });
  }

  deleteReview(): void {
    if (!this.review) {
      return;
    }

    if (!this.isOwner) {
      return;
    }

    this.reviewService.delete(this.review.id).subscribe({
      next: () => {
        this.router.navigate(['/reviews/user', this.review?.user_id]);
      },
      error: (err) => {
        console.error('Error deleting review:', err);
      },
    });
  }
}
