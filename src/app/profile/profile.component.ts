import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.currentUser$;
    this.userService.getCurrentUser().subscribe();
  }
}
