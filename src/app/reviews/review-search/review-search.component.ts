import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/http/review/review.service';
import { PaginatedResult } from '../../../interfaces/paginated-result';
import { ReviewDetailed } from '../../../interfaces/review-detailed';

@Component({
  selector: 'app-review-search',
  standalone: false,
  templateUrl: './review-search.component.html',
  styleUrl: './review-search.component.css',
})
export class ReviewSearchComponent implements OnInit {
  reviews: PaginatedResult<ReviewDetailed> | null = null;

  constructor(private reviewService: ReviewService) {}
  ngOnInit(): void {}
}
