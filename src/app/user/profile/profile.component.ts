import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(
    private title: Title,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUser$;
    this.userService.getCurrentUser().subscribe();
    this.title.setTitle('AnimeHub | Profile');
  }

  onExplore(): void {
    this.router.navigate(['/explore']);
  }
}
