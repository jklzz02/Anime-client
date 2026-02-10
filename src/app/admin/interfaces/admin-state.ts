export interface AdminState {
  userDashboard: DashboardState;
  animeDashboard: DashboardState;
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
  sortDirection: 'asc' | 'desc';
}
