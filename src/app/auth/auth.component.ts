import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);

  get title() {
    if (!this.ref.data) return 'Hello world';
    return this.ref.data['title'];
  }
}
