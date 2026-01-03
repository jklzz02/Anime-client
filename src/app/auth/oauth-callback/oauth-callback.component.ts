import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-oauth-callback',
  standalone: false,
  templateUrl: './oauth-callback.component.html',
  styleUrl: './oauth-callback.component.css',
})
export class OauthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const provider = this.route.snapshot.paramMap.get('provider');
    const code = this.route.snapshot.queryParamMap.get('code');

    if (!provider || !code) {
      this.router.navigate(['/signin']);
      return;
    }

    if (provider === 'facebook') {
      const codeVerifier = sessionStorage.getItem('fb_code_verifier');
      if (!codeVerifier) {
        console.error('Code verifier not found in session storage');
        this.router.navigate(['/signin']);
        return;
      }

      this.auth
        .loginWithProvider('facebook', {
          code: code,
          redirect_uri: `${window.location.origin}/auth/facebook/callback`,
          code_verifier: codeVerifier,
        })
        .subscribe({
          next: () => this.router.navigate(['/profile']),
          error: () => this.router.navigate(['/signin']),
        });

      return;
    }
  }
}
