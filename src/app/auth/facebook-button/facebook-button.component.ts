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
  private appId = environment.providers.facebook.facebook_app_id;
  private responseType = environment.providers.facebook.response_type;
  private scope = environment.providers.facebook.scope;
  private challengeMethod = environment.providers.facebook.challenge_method;
  private oauthUrl = environment.providers.facebook.oauth_url;

  constructor(private pkceService: PkceService) {}

  async onLogin() {
    const codeVerifier: string = this.pkceService.generateVerifier(128);
    const state: string = crypto.randomUUID();
    sessionStorage.setItem('facebook_oauth_state', state);
    sessionStorage.setItem('facebook_code_verifier', codeVerifier);

    const codeChallenge: string = await this.pkceService.generateChallenge(
      codeVerifier
    );

    const params = new URLSearchParams({
      client_id: this.appId,
      redirect_uri: `${window.location.origin}/auth/facebook/callback`,
      response_type: this.responseType,
      scope: this.scope,
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: this.challengeMethod,
    });

    window.location.href = `${this.oauthUrl}?${params}`;
  }
}
