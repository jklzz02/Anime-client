import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../services/http/anime.service';
import { ReviewService } from '../../../services/http/review.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { Router } from '@angular/router';
import { Review } from '../../../interfaces/review';

@Component({
  selector: 'app-review-create',
  standalone: false,
  templateUrl: './review-create.component.html',
  styleUrl: './review-create.component.css',
})
export class ReviewCreateComponent implements OnInit {
  private user: Partial<User> = {};
  review: Partial<Review> = {};

  constructor(
    private animeService: AnimeService,
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.review.user_id = user.id;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.router.navigate(['/signin']);
      },
    });
  }
}
