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
      pageSize: 30,
      sortedBy: 'id',
      sortDirection: 'asc',
    },
    animeDashboard: {
      currentPage: 1,
      pageSize: 30,
      sortedBy: 'id',
      sortDirection: 'asc',
    },
    banList: {
      currentPage: 1,
      pageSize: 30,
      sortedBy: 'email',
      sortDirection: 'asc',
      typeFilter: 'all',
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

  getBanListState() {
    return this.getState().banList;
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

  updateBanListState(partial: Partial<AdminState['banList']>) {
    const current = this.getState();
    this.updateState({
      banList: { ...current.banList, ...partial },
    });
  }

  private updateState(partial: Partial<AdminState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partial,
    });
  }
}
