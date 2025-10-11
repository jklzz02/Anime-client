import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Licensor } from '../../interfaces/anime';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LicensorService {
  constructor(private http: HttpClient) {}
  private BASE: string = environment.anime_api_domain + '/api/Licensor';

  public getLicensors(): Observable<Licensor[]> {
    return this.http.get<Licensor[]>(this.BASE);
  }
}
