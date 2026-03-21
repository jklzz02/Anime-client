import { Component, Input } from '@angular/core';
import { ReviewDetailed } from '../../../interfaces/review-detailed';

@Component({
  selector: 'app-review-card',
  standalone: false,
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() review!: ReviewDetailed;
}
