import {Component, OnDestroy} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";
import {Subscription, timer} from "rxjs";
import {Round} from "../_models/round";

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
  private currentRound = <Round>{};

  constructor(private service: GlobalService,
              private toastr: ToastrService
  ) {
    this.service.getCurrentRound().subscribe({
      next: round => {
        this.currentRound = round;
        this.startTimer();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public openTrackUploadDialog(): void {
    if (!this.service.isLoggedIn) {
      this.toastr.info("Щоб здати трек потрібно авторизуватися");
      return;
    }
    this.service.openDialog(TrackUploadComponent, {
      width: 650
    });
  }

  private startTimer() {
    this.subscription = timer(0, 1000).subscribe(() => {
      const diff = this.currentRound.endDate.toDate().getTime() - new Date().getTime();
      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    });
  }
}
