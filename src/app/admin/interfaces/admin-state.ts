export interface AdminState {
  userDashboard: DashboardState;
  animeDashboard: DashboardState;
  reviewDashboard: DashboardState;
  banList: {
    currentPage: number;
    pageSize: number;
    sortedBy: string;
    sortDirection: 'asc' | 'desc';
    typeFilter: 'permanent' | 'temporary' | 'all';
  };
}

export interface DashboardState {
  currentPage: number;
  pageSize: number;
  sortedBy: string;
  filterBy: string | null;
  filterValue: string | null;
  sortDirection: 'asc' | 'desc';
}
