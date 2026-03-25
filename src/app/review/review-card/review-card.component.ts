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

  get preview(): string {
    return (
      this.review.content
        .replace(/>!\s?(.*?)\s?!</gs, '<span class="spoiler">$1</span>')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .substring(0, 100)
        .trimEnd() + '...'
    );
  }
}
