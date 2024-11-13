import {Component} from '@angular/core';
import {GlobalService} from "./_services/global.service";
import {Poll, PollStatus} from "./_models/poll";
import {PollComponent} from "./poll/poll.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'exit-battle';
  pollNotificationClosed: boolean = false;
  protected readonly PollStatus = PollStatus;

  constructor(private service: GlobalService) {
  }

  get spinnerText(): string {
    return this.service.spinnerText;
  }

  get showPollNotification(): boolean {
    return this.service.showPollNotification;
  }

  get activePoll(): Poll {
    return this.service.getActivePoll();
  }

  openPollDialog() {
    this.service.openDialog(PollComponent, {
      width: 1270
    });
  }

  hasMultipleDivisions(): boolean {
    return this.service.hasMultipleDivisions();
  }

  getDivision(): number {
    return this.service.getDivision();
  }

  changeDivision(division: number) {
    this.service.setDivision(division);
  }
}
