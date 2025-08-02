import { Component, Input, OnInit } from '@angular/core';
import { AnimeSummary } from '../../interfaces/anime-summary';

@Component({
  selector: 'app-anime-summary-card',
  standalone: false,
  templateUrl: './anime-summary-card.component.html',
  styleUrl: './anime-summary-card.component.css',
})
export class AnimeSummaryCardComponent implements OnInit {
  @Input() summary!: AnimeSummary;

  ngOnInit(): void {}
}
