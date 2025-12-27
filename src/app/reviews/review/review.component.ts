import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../../services/http/reviews.service';
import { PaginatedResult } from '../../../interfaces/paginated-result';
import { Review } from '../../../interfaces/review';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  reviews: Partial<PaginatedResult<Review>> = {};
  page: number = 1;
  count: number = 10;
  counter: number[] = Array(this.count);

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const paramPage = Number(param.get('page'));
      this.page = !Number.isNaN(paramPage) && paramPage > 0 ? paramPage : 1;
      this.loadReviews();
      console.log(this.reviews);
    });
  }

  private loadReviews() {
    this.reviewsService.getAll(this.page, this.count).subscribe({
      next: (data) => (this.reviews = data),
      error: (err) => {
        if (err.status >= 500 || err.status == 0) {
          this.router.navigate(['/error'], {
            queryParams: { status: err.status },
          });
        }
      },
    });
  }

  nextPage() {
    if (!this.reviews.has_next_page) {
      this.page = 1;
    } else {
      this.page++;
    }

    this.router.navigateByUrl(`reviews/${this.page}`);
  }

  previousPage() {
    if (!this.reviews.has_previous_page) {
      this.page = this.reviews.total_pages ?? 1;
    } else {
      this.page--;
    }

    this.router.navigateByUrl(`reviews/${this.page}`);
  }
}
