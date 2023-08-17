import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GlobalService} from "./_services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'exit-battle';

  @ViewChild('video')
  videoElement: ElementRef<any>;

  constructor(private service: GlobalService) {
  }

  get spinnerText(): string {
    return this.service.spinnerText;
  }

  ngAfterViewInit() {
    this.videoElement.nativeElement.muted = true;
    this.videoElement.nativeElement.play();
  }
}
