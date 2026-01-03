import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PkceService } from '../../../services/pkce/pkce.service';

@Component({
  selector: 'app-facebook-button',
  standalone: false,
  templateUrl: './facebook-button.component.html',
  styleUrl: './facebook-button.component.css',
})
export class FacebookButtonComponent {
  private appId = environment.facebook_app_id;

  constructor(private pkceService: PkceService) {}

  async onLogin() {
    const codeVerifier: string = this.pkceService.generateVerifier(128);
    const state: string = crypto.randomUUID();
    sessionStorage.setItem('fb_oauth_state', state);
    sessionStorage.setItem('fb_code_verifier', codeVerifier);

    const codeChallenge: string = await this.pkceService.generateChallenge(
      codeVerifier
    );

    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: `${window.location.origin}/auth/facebook/callback`,
      response_type: 'code',
      scope: 'email,public_profile',
      state: crypto.randomUUID(),
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `https://www.facebook.com/v17.0/dialog/oauth?${params}`;
  }
}
