import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HealthCheckResponse } from '../../interfaces/health-check-response';

@Component({
  selector: 'app-service-status-dashboard',
  standalone: false,
  templateUrl: './service-status-dashboard.component.html',
  styleUrl: './service-status-dashboard.component.css',
})
export class ServiceStatusDashboardComponent implements OnInit {
  private healthCheckEndpoint: string = `${environment.anime_api_domain}/health`;

  isLoading: boolean = true;
  failed: boolean = false;
  expandFilesIntegrityMetrics: boolean = false;
  healthCheck: Partial<HealthCheckResponse> = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHealthStaus();
  }

  loadHealthStaus(): void {
    this.isLoading = true;

    this.http.get<HealthCheckResponse>(this.healthCheckEndpoint).subscribe({
      next: (data) => (this.healthCheck = data),
      error: (_) => {
        this.failed = true;
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
}
