import {Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {RemoteConfig} from "../_models/remote-config";

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.scss']
})
export class TrackUploadComponent {

  public remoteConfig = <RemoteConfig>{};
  public file: File;

  constructor(private service: GlobalService) {
    this.remoteConfig = service.getRemoteConfig();
  }

  onFileSelected($event: any) {
    this.file = event.target['files'][0];
  }
}
