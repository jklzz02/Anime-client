import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './dash-board/user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [DashBoardComponent, UserDashboardComponent],
  imports: [CommonModule, RouterModule, AdminRoutingModule],
})
export class AdminModule {}
