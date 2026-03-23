import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUserService } from '../../services/user/admin-user.service';
import { AdminStateService } from '../../services/state/admin-state.service';
import { PaginatedResult } from '../../../../interfaces/paginated-result';
import { User } from '../../../../interfaces/user';
import { TableColumn } from '../../shared/interfaces/table-column';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  users: PaginatedResult<User> | null = null;
  columns: TableColumn<User>[] = [];

  currentPage = 1;
  pageSize = 30;
  hasNextPage = false;
  maxPage = 0;
  userRowLink = (user: User) => ['/admin/user', user.id];

  @ViewChild('usernameTpl') usernameTpl!: TemplateRef<{ $implicit: User }>;
  @ViewChild('roleTpl') roleTpl!: TemplateRef<{ $implicit: User }>;

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

  ngAfterViewInit(): void {
    this.columns = [
      {
        key: 'id',
        header: 'ID',
        accessor: (user) => '#' + user.id,
        cellClass: 'opacity-70',
      },
      {
        key: 'username',
        header: 'Username',
        template: this.usernameTpl,
      },
      {
        key: 'email',
        header: 'Email',
      },
      {
        key: 'role',
        header: 'Role',
        template: this.roleTpl,
      },
    ];
  }

  loadUsers(): void {
    this.userService
      .getUserList(this.currentPage, this.pageSize)
      .pipe(
        finalize(() => {
          this.adminStateService.updateUserDashboardState({
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          });
        }),
      )
      .subscribe({
        next: (data) => {
          this.users = data;
          this.hasNextPage = data.has_next_page;
          this.maxPage = data.total_pages;
        },
        error: (err) => {
          this.router.navigate(['/error'], {
            state: { status: err.status, message: err.message },
          });
        },
      });
  }

  onNextPage(): void {
    this.currentPage = this.hasNextPage ? this.currentPage + 1 : 1;
    this.loadUsers();
  }

  onPreviousPage(): void {
    this.currentPage =
      this.currentPage === 1 ? this.maxPage : this.currentPage - 1;
    this.loadUsers();
  }
}
