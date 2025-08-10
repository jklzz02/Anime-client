import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-google-button',
  standalone: false,
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.css',
})
export class GoogleButtonComponent implements OnInit {
  constructor(private http: HttpClient) {}

  private credential: string = '';

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.google_client_id as any,
      callback: this.handleResponse.bind(this),
    });

    google.accounts.id.renderButton(document.getElementById('google-button'), {
      type: 'standard',
      size: 'large',
      theme: 'filled_blue',
      shape: 'pill',
    });
  }

  public handleResponse(data: any) {
    this.credential = data.credential;
  }
}
