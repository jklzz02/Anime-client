import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-google-button',
  standalone: false,
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css'],
})
export class GoogleButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef;

  private credential: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.google_client_id as any,
      callback: this.handleResponse.bind(this),
    });
  }

  ngAfterViewInit(): void {
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      type: 'standard',
      theme: 'filled_blue',
      shape: 'pill',
      width: 240,
    });
  }

  public handleResponse(data: any) {
    this.credential = data.credential;
  }
}
