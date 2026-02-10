import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUserService } from '../../services/user/admin-user.service';
import { AdminStateService } from '../../services/state/admin-state.service';
import { PaginatedResult } from '../../../../interfaces/paginated-result';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  users: PaginatedResult<User> | null = null;

  currentPage: number = 1;
  pageSize: number = 30;
  hasNextPage: boolean = false;
  maxPage: number = 0;

  constructor(
    private adminStateService: AdminStateService,
    private userService: AdminUserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const state = this.adminStateService.getUserDashboardState();
    this.currentPage = state.currentPage ?? 1;
    this.pageSize = state.pageSize ?? 30;

    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUserList(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.users = data;
        this.hasNextPage = data.has_next_page;
        this.maxPage = data.total_pages;

        this.adminStateService.updateUserDashboardState({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        });
      },
      error: (err) => {
        this.router.navigate(['/error'], {
          state: { status: err.status, message: err.message },
        });
      },
    });
  }

  nextPage(): void {
    this.currentPage = this.hasNextPage ? this.currentPage + 1 : 1;
    this.loadUsers();
  }

  previousPage(): void {
    this.currentPage =
      this.currentPage === 1 ? this.maxPage : this.currentPage - 1;
    this.loadUsers();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.maxPage) {
      this.currentPage = page;
      this.loadUsers();
    }
  }
}
