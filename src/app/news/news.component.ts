import {Component, OnDestroy} from '@angular/core';
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {

  days: number;
  hours: number;
  minutes: number;

  private subscription: Subscription;

  constructor() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getTimerText(): string {
    return 'Новий сезон через';
  }

  private startTimer() {
    this.subscription = timer(0, 2000).subscribe(() => {
      let diff = new Date('2024-09-09T12:00:00.000+03:00').getTime() - new Date().getTime();

      if (diff < 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
      } else {
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      }
    });
  }
}
