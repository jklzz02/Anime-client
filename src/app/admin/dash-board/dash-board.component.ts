import { Component } from '@angular/core';
import { HealtCheckService } from '../../../services/http/health/healt-check.service';
import { CacheHealthResponse } from '../../../interfaces/cache-health-response';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dash-board',
  standalone: false,
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css',
})
export class DashBoardComponent {
  cacheStatus: Partial<CacheHealthResponse> = {};

  constructor(
    private health: HealtCheckService,
    private router: Router,
  ) {}

  getCacheHealth(): void {
    this.health.getCacheHealthStatus().subscribe({
      next: (status) => (this.cacheStatus = status),
      error: (err) => {
        this.router.navigate(['error'], {
          state: { status: err.status, message: err.message },
        });
      },
    });
  }
}
