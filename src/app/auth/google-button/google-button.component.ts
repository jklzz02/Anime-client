import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

declare const google: any;

@Component({
  selector: 'app-google-button',
  standalone: false,
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css'],
})
export class GoogleButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef;

  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.providers.google.google_client_id as any,
      callback: this.handleResponse.bind(this),
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      type: 'standard',
      theme: 'filled_blue',
      shape: 'pill',
      width: 240,
    });
  }

  public handleResponse(data: any): void {
    if (!data.credential) {
      this.errorMessage = 'No credential received from Google';
      return;
    }

    this.errorMessage = '';

    this.authService.googleLogin(data.credential).subscribe({
      next: (response) => {
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Login failed. Please try again.';
      },
    });
  }
}
