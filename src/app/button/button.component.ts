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

  @Output()
  click = new EventEmitter<MouseEvent>();

  onClick($event: MouseEvent) {
    this.click.emit($event);
  }
}
