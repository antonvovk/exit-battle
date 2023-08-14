import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {TrackUploadComponent} from "../track-upload/track-upload.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  constructor(private service: GlobalService) {
  }

  public openTrackUploadDialog(): void {
    this.service.openDialog(TrackUploadComponent, {
      width: 650
    });
  }
}
