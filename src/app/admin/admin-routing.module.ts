import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { UserDashboardComponent } from './dash-board/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DashBoardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UserDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
