import { Component, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { Router } from '@angular/router';
import { AdminUserService } from '../../services/user/admin-user.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  pageSize: number = 30;
  counter = Array(this.pageSize);

  constructor(
    private userService: AdminUserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUserList(this.page, this.pageSize).subscribe({
      next: (data) => (this.users = data),
      error: (err) => {
        this.router.navigate(['/error'], {
          state: { status: err.status, message: err.message },
        });
      },
    });
  }
}
