import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-facebook-button',
  standalone: false,
  templateUrl: './facebook-button.component.html',
  styleUrl: './facebook-button.component.css',
})
export class FacebookButtonComponent {
  private appId = environment.facebook_app_id;
  private redirectUri = `${window.location.origin}/auth/facebook-callback`;
  private scope = 'email,public_profile';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const fbUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${
      this.appId
    }&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${
      this.scope
    }&response_type=token&state=123`;

    const popup = window.open(fbUrl, 'Facebook Login', 'width=500,height=600');

    const interval = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(interval);
        }

        if (popup && popup.location.href.startsWith(this.redirectUri)) {
          const hash = popup.location.hash;
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get('access_token');

          if (accessToken) {
            this.authService.facebookLogin(accessToken).subscribe(() => {
              this.router.navigate(['/profile']);
            });
          }

          popup.close();
          clearInterval(interval);
        }
      } catch {
        // cross-origin until redirected
      }
    }, 500);
  }
}
