import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { ReviewService } from '../../../services/http/review.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { Review } from '../../../interfaces/review';
import { AnimeListItem } from '../../../interfaces/anime-list-item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-create',
  standalone: false,
  templateUrl: './review-create.component.html',
  styleUrl: './review-create.component.css',
})
export class ReviewCreateComponent implements OnInit {
  review: Partial<Review> = {};
  selectedAnime?: AnimeListItem;
  submitAttempted = false;
  isSubmitting = false;

  @ViewChildren('formSection') formSections!: QueryList<
    ElementRef<HTMLElement>
  >;

  private readonly fieldOrder = ['anime_id', 'title', 'content', 'score'];

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => (this.review.user_id = user.id),
      error: () => this.router.navigate(['/signin']),
    });
  }

  onAnimeSelected(anime: AnimeListItem | undefined): void {
    this.selectedAnime = anime;
    if (anime) {
      this.review.anime_id = anime.id;
    }
  }

  onSubmit(form: NgForm): void {
    this.submitAttempted = true;

    if (form.invalid) {
      form.control.markAllAsTouched();
      setTimeout(() => this.scrollToFirstError(form), 100);
      return;
    }

    if (!this.selectedAnime?.id) {
      return;
    }

    this.isSubmitting = true;

    const payload: Partial<Review> = {
      ...this.review,
      anime_id: this.selectedAnime.id,
      created_at: new Date().toISOString(),
    };

    this.reviewService.create(payload).subscribe({
      next: (created) => this.router.navigate(['/review', created.id]),
      error: (err) => this.handleSubmitError(err, form),
      complete: () => (this.isSubmitting = false),
    });
  }

  private handleSubmitError(err: any, form: NgForm): void {
    this.isSubmitting = false;

    if (err.status === 400) {
      form.control.setErrors({ serverError: true });
      return;
    }

    if (err.status === 401) {
      this.router.navigate(['/signin']);
      return;
    }

    this.router.navigate(['/error'], {
      state: { status: err.status, message: err.message },
    });
  }

  private scrollToFirstError(form: NgForm): void {
    const firstInvalidField = this.fieldOrder.find(
      (fieldName) => form.controls[fieldName]?.invalid,
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

  getErrorMessages(form: NgForm): string[] {
    const errors: string[] = [];

    if (form.controls['anime_id']?.invalid) {
      errors.push('Anime must be selected');
    }
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
