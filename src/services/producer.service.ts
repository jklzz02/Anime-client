import { Injectable } from '@angular/core';
import { Producer } from '../interfaces/anime';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProducerService {
  constructor(private http: HttpClient) {}
  private BASE: string = 'https://localhost:7145/api/Producer';

  public getProducers(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.BASE);
  }
}
