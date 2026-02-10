import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-single-dropdown',
  standalone: false,
  templateUrl: './single-dropdown.component.html',
  styleUrl: './single-dropdown.component.css',
})
export class SingleDropdownComponent<T> {
  @Input() items: T[] = [];
  @Input() valueFn!: (item: T) => any;
  @Input() labelFn!: (item: T) => string;
  @Input() placeholder: string = 'Select...';
  @Input() label: string = '';
  @Input() selected?: any;
  @Output() selectedChange = new EventEmitter<any>();

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: T) {
    this.selected = this.valueFn(item);
    this.selectedChange.emit(this.selected);
    this.isOpen = false;
  }

  clearSelection() {
    this.selected = null;
    this.selectedChange.emit(null);
    this.isOpen = false;
  }

  getDisplayText(): string {
    if (!this.selected) {
      return this.placeholder;
    }
    const selectedItem = this.items.find(
      (item) => this.valueFn(item) === this.selected
    );
    return selectedItem ? this.labelFn(selectedItem) : this.placeholder;
  }

  isSelected(item: T): boolean {
    return this.valueFn(item) === this.selected;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }
}
