import {Component, OnDestroy} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Subscription, timer} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

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

  constructor(private toastr: ToastrService,
              private db: AngularFirestore
  ) {
    this.startTimer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getTimerText(): string {
    return 'Раунд завершиться через';
  }

  private startTimer() {
    this.subscription = timer(0, 2000).subscribe(() => {
      let diff;
      diff = new Date().getTime() - new Date().getTime();

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
