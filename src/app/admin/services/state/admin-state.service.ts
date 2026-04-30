import { Injectable } from '@angular/core';
import { AdminState } from '../../interfaces/admin-state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminStateService {
  private readonly initialState: AdminState = {
    userDashboard: {
      currentPage: 1,
      pageSize: 5,
      sortedBy: 'id',
      sortDirection: 'asc',
      filterBy: null,
      filterValue: null,
    },
    animeDashboard: {
      currentPage: 1,
      pageSize: 5,
      sortedBy: 'id',
      sortDirection: 'asc',
      filterBy: null,
      filterValue: null,
    },
    reviewDashboard: {
      currentPage: 1,
      pageSize: 5,
      sortedBy: 'id',
      sortDirection: 'asc',
      filterBy: null,
      filterValue: null,
    },
  };

  private stateSubject = new BehaviorSubject<AdminState>(this.initialState);
  state$ = this.stateSubject.asObservable();

  getState() {
    return this.stateSubject.getValue();
  }

  getUserDashboardState() {
    return this.getState().userDashboard;
  }

  getAnimeDashboardState() {
    return this.getState().animeDashboard;
  }

  getReviewDashBoardState() {
    return this.getState().reviewDashboard;
  }

  updateUserDashboardState(partial: Partial<AdminState['userDashboard']>) {
    const current = this.getState();
    this.updateState({
      userDashboard: { ...current.userDashboard, ...partial },
    });
  }

  updateAnimeDashboardState(partial: Partial<AdminState['animeDashboard']>) {
    const current = this.getState();
    this.updateState({
      animeDashboard: { ...current.animeDashboard, ...partial },
    });
  }

  updateReviewDashboardState(partial: Partial<AdminState['reviewDashboard']>) {
    const current = this.getState();
    this.updateState({
      reviewDashboard: { ...current.reviewDashboard, ...partial },
    });
  }

  private updateState(partial: Partial<AdminState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial,
    });
  }
}
