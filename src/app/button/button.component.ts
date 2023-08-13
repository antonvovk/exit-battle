import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  title = '';

  @Input()
  disabled = false;

  @Input()
  red = false;

  @Output()
  clicked = new EventEmitter<MouseEvent>();

  onClick($event: MouseEvent) {
    this.clicked.emit($event);
  }
}
