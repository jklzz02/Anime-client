import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashBoardComponent],
  imports: [CommonModule, RouterModule, AdminRoutingModule],
})
export class AdminModule {}
