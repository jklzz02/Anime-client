import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UserDashboardComponent } from './dash-board/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { AnimeDashboardComponent } from './dash-board/anime-dashboard/anime-dashboard.component';
import { ReviewDashboardComponent } from './dash-board/review-dashboard-component/review-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashBoardComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UserDashboardComponent,
        title: 'AnimeHQ | Admin users',
      },
      {
        path: 'anime',
        component: AnimeDashboardComponent,
        title: 'AnimeHQ | Admin anime',
      },
      {
        path: 'reviews',
        component: ReviewDashboardComponent,
        title: 'AnimeHQ | Admin reviews',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
