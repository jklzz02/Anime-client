import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  statusCode: number = 0;
  message: string | null = null;

  constructor(
    private router: Router,
    private title: Title,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state) {
      const code = Number(state['status']);
      if (!Number.isNaN(code) && code !== 0) {
        this.statusCode = code;
      }
      this.message = state['message'] || null;
    }
  }

  ngOnInit(): void {
    if (this.statusCode === 0) {
      this.title.setTitle('Error Unknown');
    } else {
      this.title.setTitle('Error ' + this.statusCode);
    }
  }
}
