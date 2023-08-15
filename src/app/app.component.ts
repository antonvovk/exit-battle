import {Component} from '@angular/core';
import {GlobalService} from "./_services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'exit-battle';

  constructor(private service: GlobalService) {
  }

  get spinnerText(): string {
    return this.service.spinnerText;
  }
}
