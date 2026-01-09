import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewDetailed } from '../../../interfaces/review-detailed';
import { ReviewService } from '../../../services/http/review.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
}
