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
      this.router.navigate(['/login']);
      return;
    }

    this.auth.loginWithProvider(provider, code).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: () => this.router.navigate(['/login']),
    });
  }
}
