import { Injectable } from '@angular/core';
import { Producer } from '../../../interfaces/anime';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProducerService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Producer';
  private headers: HttpHeaders = new HttpHeaders({
    'X-Client-Key': environment.x_client_key,
  });

  public getProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.BASE, { headers: this.headers });
  }
}
