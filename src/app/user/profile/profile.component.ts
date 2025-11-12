import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUser$;
    this.userService.getCurrentUser().subscribe();
  }

  onExplore(): void {
    this.router.navigate(['/explore']);
  }
}
