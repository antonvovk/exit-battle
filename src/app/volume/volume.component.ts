import {AfterViewInit, Component} from '@angular/core';
import {GlobalService} from "../_services/global.service";

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements AfterViewInit {

  constructor(private service: GlobalService) {
  }

  getVolume(): number {
    return this.service.getVolume();
  }

  onVolumeChange(event: any) {
    this.service.setVolume(event.target.value);
    this.updateSliderBackground();
  }

  updateSliderBackground() {
    const slider: any = document.querySelector('.slider');
    const value = ((this.getVolume() / slider.max) * 100);
    slider.style.background = `linear-gradient(to right, #C80F2E ${value}%, #FFFFFF ${value}%)`;
  }

  ngAfterViewInit() {
    this.updateSliderBackground();
  }
}
