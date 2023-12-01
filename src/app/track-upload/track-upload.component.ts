import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {GlobalService} from "../_services/global.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Round} from "../_models/round";
import {Editor, toHTML, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrackUploadComponent implements OnInit, OnDestroy {

  public file: File;
  public readMetadata: boolean = false;
  public fileUrl: string;
  public currentRound = <Round>{};

  editor: Editor;
  html: '';
  toolbar: Toolbar = [
    ['bold', 'underline', 'strike'],
    ['format_clear'],
  ];

  private duration: number;
  private lyrics: string;

  constructor(private service: GlobalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
  ) {
    this.service.getGlobalState().subscribe({
      next: state => {
        this.currentRound = state.currentRound;
      }
    });
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onFileSelected($event: any) {
    this.duration = 0;
    this.readMetadata = false;

    const uploadedFile = $event.target['files'][0];
    if (!uploadedFile.name.endsWith('.mp3')) {
      this.toastr.error("Вибраний файл не є файлом формату .mp3");
      this.file = undefined;
      this.fileUrl = undefined;
      return;
    } else {
      this.file = uploadedFile;
      this.fileUrl = URL.createObjectURL(this.file);
    }
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
    const maximumTrackDurationInSeconds = this.currentRound.maximumTrackDurationInSeconds;
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

  onLyricsInput(json: any) {
    this.lyrics = toHTML(json);
  }
}
