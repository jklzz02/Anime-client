export interface AdminState {
  userDashboard: DashboardState;
  animeDashboard: DashboardState;
  reviewDashboard: DashboardState;
}

export interface DashboardState {
  currentPage: number;
  pageSize: number;
  sortedBy: string;
  filterBy: string | null;
  filterValue: string | null;
  sortDirection: 'asc' | 'desc';
}
