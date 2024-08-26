import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'exit-battle';

  @ViewChild('video')
  videoElement: ElementRef<any>;

  constructor() {
  }

  ngAfterViewInit() {
    this.videoElement.nativeElement.muted = true;
    this.videoElement.nativeElement.play();
  }
}
