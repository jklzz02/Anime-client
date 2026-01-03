import { Component } from '@angular/core';
import { PkceService } from '../../../services/pkce/pkce.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-discord-button',
  standalone: false,
  templateUrl: './discord-button.component.html',
  styleUrl: './discord-button.component.css',
})
export class DiscordButtonComponent {
  private config = environment.providers.discord;

  constructor(private pkceService: PkceService) {}

  async onLogin() {
    const verifier = this.pkceService.generateVerifier(128);
    const state = crypto.randomUUID();

    sessionStorage.setItem('discord_oauth_state', state);
    sessionStorage.setItem('discord_code_verifier', verifier);

    const challenge = await this.pkceService.generateChallenge(verifier);

    const params = new URLSearchParams({
      client_id: this.config.client_id,
      redirect_uri: `${window.location.origin}/auth/discord/callback`,
      response_type: this.config.response_type,
      scope: this.config.scope,
      state,
      code_challenge: challenge,
      code_challenge_method: this.config.challenge_method,
    });

    window.location.href = `${this.config.authorize_url}?${params}`;
  }
}
