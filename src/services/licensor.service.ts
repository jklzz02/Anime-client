import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Licensor } from '../interfaces/anime';

@Injectable({
  providedIn: 'root',
})
export class LicensorService {
  constructor(private http: HttpClient) {}
  private BASE: string = 'https://localhost:7145/api/Licensor';

  public getLicensors(): Observable<Licensor[]> {
    return this.http.get<Licensor[]>(this.BASE);
  }
}
