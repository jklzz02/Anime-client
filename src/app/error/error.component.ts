import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: false,
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  statusCode: Number = 0;

  constructor(private route: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const code: Number = new Number(params.get('status'));
      this.statusCode = code;
    });

    if (this.statusCode == 0) {
      this.title.setTitle('Error Unknown');
    } else {
      this.title.setTitle('Error ' + this.statusCode);
    }
  }
}
