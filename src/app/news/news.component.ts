import {Component, OnDestroy} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";
import {ToastrService} from "ngx-toastr";
import {Subscription, timer} from "rxjs";
import {Round} from "../_models/round";
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
  private currentRound = <Round>{};

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private db: AngularFirestore
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
    if (!this.service.isTracksUploadOpen()) {
      this.toastr.info("На даний момент здача треків призупинена");
      return;
    }
    this.db.collection('tracks', ref => ref
      .where('round', '==', this.currentRound.number)
      .where('nickname', '==', this.service.getCurrentNickname())
      .limit(1)
    ).get().subscribe({
      next: docs => {
        if (docs.docs.length === 0) {
          this.service.openDialog(TrackUploadComponent, {
            width: 800
          });
        } else {
          this.toastr.info("Ви вже здали трек для цього раунду. Здати трек можна лише один раз.");
          return;
        }
      }
    });
  }

  private startTimer() {
    this.subscription = timer(0, 2000).subscribe(() => {
      const diff = this.currentRound.endDate.toDate().getTime() - new Date().getTime();
      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    });
  }
}
