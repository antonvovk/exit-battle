import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  days: number;
  hours: number;
  minutes: number;
  private currentRoundEndDate: Date;
  private subscription: Subscription;

  constructor(private service: GlobalService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.currentRoundEndDate = this.service.getCurrentRound().endDate;
    this.subscription = timer(0, 1000).subscribe(() => {
      const diff = this.currentRoundEndDate.getTime() - new Date().getTime();
      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
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
}
