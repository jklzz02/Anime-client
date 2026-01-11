import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ReviewService } from '../../../services/http/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../../interfaces/review';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';
import { forkJoin } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-update',
  standalone: false,
  templateUrl: './review-update.component.html',
  styleUrl: './review-update.component.css',
})
export class ReviewUpdateComponent implements OnInit {
  private reviewId: number | null = null;
  private user: Partial<User> = {};
  review: Partial<Review> = {};
  private originalReview: Partial<Review> = {};

  submitAttempted = false;
  isSubmitting = false;

  @ViewChildren('formSection') formSections!: QueryList<
    ElementRef<HTMLElement>
  >;

  private readonly fieldOrder = ['title', 'content', 'score'];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['signin']);
      return;
    }

    this.route.paramMap.subscribe((params) => {
      const reviewId = params.get('id');
      if (Number.isNaN(Number(reviewId))) {
        this.router.navigate(['not-found']);
        return;
      }
      this.reviewId = Number(reviewId);

      forkJoin({
        user: this.userService.getCurrentUser(),
        review: this.reviewService.getById(this.reviewId),
      }).subscribe({
        next: ({ user, review }) => {
          this.user = user;
          this.review = review;
          this.originalReview = { ...review };

          if (this.review.user_id !== this.user.id) {
            this.router.navigate(['/error'], {
              queryParams: { status: 401, message: 'Unauthorized' },
            });
            return;
          }
        },
        error: (err) => {
          if (err.status >= 500) {
            this.router.navigate(['/error'], {
              queryParams: { status: err.status, message: err.message },
            });
          }
        },
      });
    });
  }

  updateReview(form: NgForm): void {
    this.submitAttempted = true;

    if (form.invalid) {
      form.control.markAllAsTouched();
      setTimeout(() => this.scrollToFirstError(form), 100);
      return;
    }

    this.isSubmitting = true;

    this.reviewService.update(this.review).subscribe({
      next: (updatedReview) => {
        this.router.navigate(['/review', updatedReview.id]);
      },
      error: (err) => {
        this.isSubmitting = false;

        if (err.status === 401) {
          this.router.navigate(['/signin']);
          return;
        }

        if (err.status === 403) {
          this.router.navigate(['/error'], {
            queryParams: { status: 403, message: 'Forbidden' },
          });
          return;
        }

        if (err.status >= 500) {
          this.router.navigate(['/error'], {
            queryParams: { status: err.status, message: err.message },
          });
        }
      },
      complete: () => (this.isSubmitting = false),
    });
  }

  private scrollToFirstError(form: NgForm): void {
    const firstInvalidField = this.fieldOrder.find(
      (fieldName) => form.controls[fieldName]?.invalid
    );

    if (!firstInvalidField) return;

    const sectionIndex = this.fieldOrder.indexOf(firstInvalidField);
    const sections = this.formSections.toArray();

    if (sections[sectionIndex]) {
      sections[sectionIndex].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  get isDirty(): boolean {
    return (
      this.review.title !== this.originalReview.title ||
      this.review.content !== this.originalReview.content ||
      this.review.score !== this.originalReview.score
    );
  }

  getErrorMessages(form: NgForm): string[] {
    const errors: string[] = [];

    if (form.controls['title']?.invalid) {
      errors.push('Title is invalid');
    }
    if (form.controls['content']?.invalid) {
      errors.push('Content is invalid');
    }
    if (form.controls['score']?.invalid) {
      errors.push('Score is invalid');
    }

    return errors;
  }
}
