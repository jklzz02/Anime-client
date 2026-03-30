import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReviewService } from '../../../../services/http/review/review.service';
import { PaginatedResult } from '../../../../interfaces/paginated-result';
import { ReviewDetailed } from '../../../../interfaces/review-detailed';
import { AdminStateService } from '../../services/state/admin-state.service';
import { TableColumn } from '../../shared/interfaces/table-column';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-dashboard-component',
  standalone: false,
  templateUrl: './review-dashboard.component.html',
  styleUrl: './review-dashboard.component.css',
})
export class ReviewDashboardComponent implements OnInit, AfterViewInit {
  reviews: PaginatedResult<ReviewDetailed> | null = null;
  columns: TableColumn<ReviewDetailed>[] = [];

  currentPage = 1;
  pageSize = 30;
  hasNextPage = false;
  maxPage = 0;

  @ViewChild('animeTpl') animeTpl!: TemplateRef<{ $implicit: ReviewDetailed }>;
  @ViewChild('scoreTpl') scoreTpl!: TemplateRef<{ $implicit: ReviewDetailed }>;
  @ViewChild('userTpl') userTpl!: TemplateRef<{ $implicit: ReviewDetailed }>;

  reviewRowLink = (review: ReviewDetailed) => ['/admin/review/', review.id];

  constructor(
    private adminStateService: AdminStateService,
    private reviewService: ReviewService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const state = this.adminStateService.getReviewDashBoardState();
    this.currentPage = state.currentPage ?? 1;
    this.pageSize = state.pageSize ?? 30;

    this.loadReviews();
  }

  ngAfterViewInit(): void {
    this.columns = [
      {
        key: 'id',
        header: 'ID',
        accessor: (review) => review.id,
      },
      {
        key: 'title',
        header: 'Title',
        accessor: (review) => review.title,
      },
      {
        key: 'anime',
        header: 'Anime',
        template: this.animeTpl,
      },
      {
        key: 'score',
        header: 'Score',
        template: this.scoreTpl,
      },
      {
        key: 'created_by',
        header: 'Created by',
        template: this.userTpl,
      },
    ];
  }

  private loadReviews(): void {
    this.reviewService
      .getAll(this.currentPage, this.pageSize)
      .pipe(
        finalize(() => {
          this.adminStateService.updateReviewDashboardState({
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          });
        }),
      )
      .subscribe({
        next: (data) => {
          this.reviews = data;
          this.hasNextPage = data.has_next_page;
          this.maxPage = data.total_pages;
        },
        error: (err) => {
          this.router.navigate(['/error'], {
            state: { status: err.status, message: err.message },
          });
        },
      });
  }

  onNextPage(): void {
    this.currentPage = this.hasNextPage ? this.currentPage + 1 : 1;
    this.loadReviews();
  }

  onPreviousPage(): void {
    this.currentPage =
      this.currentPage === 1 ? this.maxPage : this.currentPage - 1;
    this.loadReviews();
  }
}
