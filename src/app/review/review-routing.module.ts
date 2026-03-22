import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

import { ReviewComponent } from './review/review.component';
import { ReviewSearchComponent } from './review-search/review-search.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import { UserReviewComponent } from './user-review/user-review.component';

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  {
    path: 'search',
    component: ReviewSearchComponent,
    title: 'AnimeHQ | Review Search',
  },
  {
    path: 'user/:userId',
    component: UserReviewComponent,
    title: "AnimeHQ | User's Reviews",
  },
  {
    path: 'create',
    component: ReviewCreateComponent,
    canActivate: [authGuard],
    title: 'AnimeHQ | Write a Review',
    data: { authMessage: 'To write a review you must sign in first.' },
  },
  {
    path: 'edit/:id',
    component: ReviewUpdateComponent,
    canActivate: [authGuard],
    title: 'AnimeHQ | Edit Review',
  },
  {
    path: 'detail/:id',
    component: ReviewDetailComponent,
    title: 'AnimeHQ | Review',
  },
  {
    path: ':page',
    component: ReviewComponent,
    title: 'AnimeHQ | Reviews',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
