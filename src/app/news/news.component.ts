import {Component} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;

  constructor() {
  }

  public getTimerText(): string {
    return 'Раунд завершиться через';
  }
}
