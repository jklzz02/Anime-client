import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multi-dropdown',
  standalone: false,
  templateUrl: './multi-dropdown.component.html',
  styleUrl: './multi-dropdown.component.css',
})
export class MultiDropdownComponent {
  @Input() label = '';
  @Input() options: string[] = [];
  @Input() selected: string[] = [];

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleValue(value: string) {
    const index = this.selected.indexOf(value);
    if (index === -1) {
      this.selected.push(value);
    } else {
      this.selected.splice(index, 1);
    }
  }

  isChecked(value: string): boolean {
    return this.selected.includes(value);
  }
}
