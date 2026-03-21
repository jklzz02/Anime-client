import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewService } from '../../../services/http/review/review.service';
import { PaginatedResult } from '../../../interfaces/paginated-result';
import { ReviewDetailed } from '../../../interfaces/review-detailed';
import { ReviewSearchParameters } from '../../../interfaces/review-search-parameters';

@Component({
  selector: 'app-review-search',
  standalone: false,
  templateUrl: './review-search.component.html',
  styleUrl: './review-search.component.css',
})
export class ReviewSearchComponent implements OnInit {
  page: number = 1;
  lastPage: number = 1;
  count: number = 10;
  counter: number[] = Array(this.count).fill(0);

  reviews: Partial<PaginatedResult<ReviewDetailed>> = {};
  loading: boolean = true;
  notFound: boolean = false;

  params: Partial<ReviewSearchParameters> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = this.parseQueryParams(params);
      this.loading = true;

      this.page = params['page'] ? Number(params['page']) : 1;

      if (this.page <= 0) {
        this.page = 1;
      }

      this.loadReviews(this.params, this.page, this.count);
    });
  }

  loadReviews(
    parameters: Partial<ReviewSearchParameters>,
    page: number,
    count: number,
  ): void {
    this.reviewService.searchReviews(parameters, page, count).subscribe({
      next: (data) => {
        this.reviews = data;
        this.lastPage = data.total_pages;
        this.loading = false;
        this.notFound = false;
      },
      error: (err) => {
        if (err.status == 404) {
          this.notFound = true;
          this.loading = false;
          return;
        }

        this.router.navigate(['error'], {
          state: { status: err.status },
        });
      },
    });
  }

  nextPage(): void {
    const nextPageNumber: number =
      this.page + 1 > this.lastPage ? 1 : this.page + 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: nextPageNumber, count: this.count },
      queryParamsHandling: 'merge',
    });
  }

  previousPage(): void {
    const prevPageNumber: number =
      this.page - 1 <= 0 ? this.lastPage : this.page - 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: prevPageNumber, count: this.count },
      queryParamsHandling: 'merge',
    });
  }

  private parseQueryParams(params: Params): Partial<ReviewSearchParameters> {
    const asNumber = (value?: string) =>
      value !== undefined ? Number(value) : undefined;

    return {
      title: params['title'] ?? undefined,
      anime_id: asNumber(params['anime_id']),
      anime_title: params['anime_title'] ?? undefined,
      user_id: asNumber(params['user_id']),
      user_name: params['user_name'] ?? undefined,
      from: params['from'] ?? undefined,
      to: params['to'] ?? undefined,
      min_score: asNumber(params['min_score']),
      max_score: asNumber(params['max_score']),
      oder_by: params['oder_by'] ?? undefined,
      sort_order: params['sort_order'] ?? undefined,
    };
  }
}
