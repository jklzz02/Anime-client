import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  currentYear: number | null = null;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
