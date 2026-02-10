import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './dash-board/user-dashboard/user-dashboard.component';
import { AnimeDashboardComponent } from './dash-board/anime-dashboard/anime-dashboard.component';
import { DashboardTableComponent } from './shared/dashboard-table/dashboard-table.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    UserDashboardComponent,
    AnimeDashboardComponent,
    DashboardTableComponent,
  ],
  imports: [CommonModule, RouterModule, AdminRoutingModule],
})
export class AdminModule {}
