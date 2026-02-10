import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: 'blue' | 'lavender' | 'green' | 'peach' = 'lavender';
  @Input() message?: string;
  @Input() showCard: boolean = true;

  get spinnerClasses(): string {
    const sizeMap = {
      small: 'w-8 h-8 border-4',
      medium: 'w-16 h-16 border-8',
      large: 'w-24 h-24 border-[12px]',
    };

    const colorMap = {
      blue: 'border-t-blue-light dark:border-t-blue',
      lavender: 'border-t-lavender-light dark:border-t-lavender',
      green: 'border-t-green-light dark:border-t-green',
      peach: 'border-t-peach-light dark:border-t-peach',
    };

    return `${sizeMap[this.size]} ${
      colorMap[this.color]
    } rounded-full border-surface0-light dark:border-surface0 animate-spin`;
  }

  get messageClasses(): string {
    const sizeMap = {
      small: 'text-xs',
      medium: 'text-sm',
      large: 'text-base',
    };

    return `${sizeMap[this.size]} font-medium text-text-light dark:text-text`;
  }

  get cardPaddingClasses(): string {
    const paddingMap = {
      small: 'p-4',
      medium: 'p-8',
      large: 'p-12',
    };

    return paddingMap[this.size];
  }
}
