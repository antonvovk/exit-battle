import {Component, OnDestroy} from '@angular/core';
import {GlobalService} from "../_services/global.service";
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
    this.service.getGlobalState().subscribe({
      next: state => {
        this.currentRound = state.currentRound;
        this.startTimer();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getTimerText(): string {
    if (this.service.getRemoteConfig().customTimerEnabled) {
      return this.service.getRemoteConfig().customTimerText;
    } else {
      return 'Раунд завершиться через';
    }
  }

  public openTrackUploadDialog(): void {
    this.service.openTrackUploadDialog();
  }

  public hasMultipleDivisions(): boolean {
    return this.service.getSelectedRound().hasMultipleDivisions;
  }

  getDivision(): number {
    return this.service.getDivision();
  }

  changeDivision(division: number) {
    this.service.setDivision(division);
  }

  private startTimer() {
    this.subscription = timer(0, 2000).subscribe(() => {
      let diff;
      if (this.service.getRemoteConfig().customTimerEnabled) {
        diff = this.service.getRemoteConfig().customTimerDate.toDate().getTime() - new Date().getTime();
      } else {
        diff = this.currentRound.endDate.toDate().getTime() - new Date().getTime();
      }

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
