import { Component, OnInit } from '@angular/core';
import { ReviewDetailed } from '../../../interfaces/review-detailed';
import { ReviewService } from '../../../services/http/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-review',
  standalone: false,
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css',
})
export class UserReviewComponent implements OnInit {
  reviews: ReviewDetailed[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const userId = Number(param.get('userId'));
      if (Number.isNaN(userId) || userId <= 0) {
        this.router.navigate(['/not-found']);
        return;
      }

      this.reviewsService.getByUser(userId).subscribe({
        next: (data) => {
          this.reviews = data;
          this.loading = false;
        },
        error: (err) => {
          if (err.status === 404) {
            this.reviews = [];
            this.loading = false;
            return;
          }
          if (err.status >= 500 || err.status == 0) {
            this.router.navigate(['/error'], {
              queryParams: { status: err.status },
            });
          }
        },
      });
    });
  }
}
