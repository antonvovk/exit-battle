import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input()
  placeholder = '';

  @Input()
  searchIcon = false;

  @Output()
  input = new EventEmitter<any>();

  focused = false;

  onFocusIn($event: FocusEvent) {
    this.focused = true;
  }

  onFocusOut($event: FocusEvent) {
    this.focused = false;
  }

  onInput($event: any) {
    this.input.emit($event.target.value);
  }
}
