import { Component, OnInit } from '@angular/core';
import { Review } from '../../../interfaces/review';
import { ReviewsService } from '../../../services/http/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-review',
  standalone: false,
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css',
})
export class UserReviewComponent implements OnInit {
  reviews: Review[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService
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
