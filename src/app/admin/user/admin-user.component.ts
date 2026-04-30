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
  isLoading = true;

  banModalOpened = false;
  banReason = '';
  banUntil = '';
  selectedPresetDays: number | null = null;
  isBanning = false;
  isUnbanning = false;

  today = new Date().toISOString().split('T')[0];

  banPresets = [
    { label: '1 day', days: 1 },
    { label: '1 week', days: 7 },
    { label: '2 weeks', days: 14 },
    { label: '1 month', days: 30 },
    { label: '3 months', days: 90 },
    { label: 'Permanent', days: 36500 },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('userId'));

      if (!userId) {
        this.router.navigate(['not-found']);
        return;
      }

      this.adminUserService
        .getUserDetails(userId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (data) => (this.userDetails = data),
          error: (err) =>
            this.router.navigate(['/error'], { state: { status: err.status } }),
        });
    });
  }

  isCurrentlyBanned(): boolean {
    return (
      this.userDetails.ban?.some(
        (b) => b.active && new Date(b.expiration_date) > new Date(),
      ) ?? false
    );
  }

  onBan(): void {
    this.banReason = '';
    this.banUntil = '';
    this.selectedPresetDays = null;
    this.banModalOpened = true;
  }

  applyBanPreset(days: number): void {
    this.selectedPresetDays = days;
    const d = new Date();
    d.setDate(d.getDate() + days);
    this.banUntil = d.toISOString().split('T')[0];
  }

  confirmBan(): void {
    const email = this.userDetails.user?.email;
    if (!email || !this.banReason.trim() || !this.banUntil || this.isBanning) {
      return;
    }

    this.isBanning = true;

    const expirationDate = new Date(this.banUntil);

    this.adminUserService
      .banUser(email, this.banReason, expirationDate)
      .pipe(finalize(() => (this.isBanning = false)))
      .subscribe({
        next: () => {
          this.banModalOpened = false;
          this.refreshUserDetails();
        },
        error: (err) =>
          this.router.navigate(['/error'], { state: { status: err.status } }),
      });
  }

  onUnban(): void {
    const email = this.userDetails.user?.email;
    if (!email || this.isUnbanning) return;

    this.isUnbanning = true;

    this.adminUserService
      .unbanUser(email)
      .pipe(finalize(() => (this.isUnbanning = false)))
      .subscribe({
        next: () => this.refreshUserDetails(),
        error: (err) =>
          this.router.navigate(['/error'], { state: { status: err.status } }),
      });
  }

  private refreshUserDetails(): void {
    const userId = this.userDetails.user?.id;
    if (!userId) return;

    this.adminUserService.getUserDetails(userId).subscribe({
      next: (data) => (this.userDetails = data),
      error: (err) =>
        this.router.navigate(['/error'], { state: { status: err.status } }),
    });
  }
}
