import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../services/user/admin-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from '../interfaces/user-details';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css',
})
export class AdminUserComponent implements OnInit {
  constructor(
    private adminUserService: AdminUserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  userDetails: Partial<UserDetails> = {};
  isLoading: boolean = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId: number = Number(params.get('userId'));

      if (!userId) {
        this.router.navigate(['not-found']);
      }

      this.adminUserService
        .getUserDetails(userId)
        .pipe(finalize(() => console.log(this.userDetails)))
        .subscribe({
          next: (data) => (this.userDetails = data),
          error: (err) =>
            this.router.navigate(['/error'], { state: { status: err.status } }),
          complete: () => (this.isLoading = false),
        });
    });
  }
}
