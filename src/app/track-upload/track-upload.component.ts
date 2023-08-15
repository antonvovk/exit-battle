import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {RemoteConfig} from "../_models/remote-config";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.scss']
})
export class TrackUploadComponent implements OnInit {

  public remoteConfig = <RemoteConfig>{};

  public file: File;
  public readMetadata: boolean = false;
  public fileUrl: string;
  private duration: number;
  private lyrics: string;

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.remoteConfig = this.service.getRemoteConfig();
  }

  onFileSelected($event: any) {
    this.duration = 0;
    this.readMetadata = false;
    this.file = event.target['files'][0];
    this.fileUrl = URL.createObjectURL(this.file);
  }

  onMetadata($event: any) {
    this.duration = $event.target.duration;
    this.readMetadata = true;
  }

  publishTrack() {
    if (this.lyrics == null || this.lyrics.trim().length == 0) {
      this.toastr.error("Текст треку не може бути порожнім");
      return;
    }
    if (this.file == null) {
      this.toastr.error("Файл треку не вибраний");
      return;
    }
    if (this.duration == 0) {
      this.toastr.warning("Спробуйте ще раз");
      return;
    }
    const maximumTrackDurationInSeconds = this.service.getCurrentRound().maximumTrackDurationInSeconds;
    if (this.duration > maximumTrackDurationInSeconds) {
      this.toastr.error(`Максимальна довжина треку ${maximumTrackDurationInSeconds} секунд`);
      return;
    }

    this.spinner.show();
    this.service.uploadFile(this.file, this.lyrics, this.duration).subscribe({
      next: value => {
        const percentage = Math.floor(value);
        this.service.spinnerText = `Завантажуємо трек ${percentage}%`
      },
      error: err => {
        this.service.handleFirebaseError(err);
        this.spinner.hide();
      }
    });
  }

  onLyricsInput($event: any) {
    this.lyrics = $event.target.value;
  }
}
