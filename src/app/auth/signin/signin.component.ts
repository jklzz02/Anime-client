import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  message: string = '';

  constructor(private router: Router) {
    const state = this.router.currentNavigation()?.extras?.state;

    if (state) {
      this.message = state['message'];
    }
  }
}
