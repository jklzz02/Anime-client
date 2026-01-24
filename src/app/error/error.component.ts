import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  statusCode: number = 0;
  message: string | null = null;
  imageUrl: string = '';

  private statusImageMap: Record<number, string> = {
    404: 'https://api.waifu.pics/sfw/cringe',
    401: 'https://api.waifu.pics/sfw/smug',
    403: 'https://api.waifu.pics/sfw/kick',
    500: 'https://api.waifu.pics/sfw/cry',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private title: Title,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      const code = Number(state['status']);
      if (!Number.isNaN(code) && code !== 0) {
        this.statusCode = code;
      } else {
        this.statusCode = 500;
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

    this.errorImageUrl().subscribe((data) => (this.imageUrl = data.url));
  }

  errorImageUrl(): Observable<any> {
    return this.http.get(this.statusImageMap[this.statusCode]);
  }
}
