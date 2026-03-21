import { forwardRef, NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review/review.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewFilterComponent } from './review-filter/review-filter.component';
import { ReviewSearchComponent } from './review-search/review-search.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';

@NgModule({
  declarations: [
    ReviewComponent,
    ReviewCardComponent,
    ReviewFilterComponent,
    ReviewSearchComponent,
    ReviewDetailComponent,
    ReviewCreateComponent,
    ReviewUpdateComponent,
    UserReviewComponent,
    MarkdownEditorComponent,
  ],
  imports: [SharedModule, MarkdownModule.forChild(), ReviewRoutingModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true,
    },
  ],
})
export class ReviewModule {}
