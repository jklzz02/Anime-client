import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-oauth-callback',
  standalone: false,
  templateUrl: './oauth-callback.component.html',
  styleUrl: './oauth-callback.component.css',
})
export class OauthCallbackComponent implements OnInit {
  private allowedProviders: string[] = environment.providers.allowed;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const provider = this.route.snapshot.paramMap
      .get('provider')
      ?.trim()
      .toLowerCase();

    const code = this.route.snapshot.queryParamMap.get('code');

    if (!provider || !code) {
      this.router.navigate(['/signin']);
      return;
    }

    if (!this.allowedProviders.includes(provider)) {
      this.router.navigate(['/signin']);
      return;
    }

    const storedState = sessionStorage.getItem(`${provider}_oauth_state`);
    const returnedState = this.route.snapshot.queryParamMap.get('state');

    console.log('Stored State:', storedState);
    console.log('Returned State:', returnedState);

    if (storedState !== returnedState) {
      this.router.navigate(['/signin']);
      return;
    }

    const codeVerifier = sessionStorage.getItem(`${provider}_code_verifier`);
    if (!codeVerifier) {
      this.router.navigate(['/signin']);
      return;
    }

    this.auth
      .loginWithProvider({
        provider: provider,
        code: code,
        redirect_uri: `${window.location.origin}/auth/${provider}/callback`,
        code_verifier: codeVerifier,
      })
      .subscribe({
        next: () => {
          sessionStorage.removeItem(`${provider}_oauth_state`);
          sessionStorage.removeItem(`${provider}_code_verifier`);
          this.router.navigate(['/profile']);
        },
        error: () => {
          sessionStorage.removeItem(`${provider}_oauth_state`);
          sessionStorage.removeItem(`${provider}_code_verifier`);
          this.router.navigate(['/signin']);
        },
      });

    return;
  }
}
