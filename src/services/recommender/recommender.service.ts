import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class RecommenderService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private BASE: string =
    environment.recommender_api_domain + '/api/Recommender';
}
