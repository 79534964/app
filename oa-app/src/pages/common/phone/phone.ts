import {Component, Input} from '@angular/core';

@Component({
  selector: 'CommonPhone',
  templateUrl: 'phone.html'
})
export class CommonPhone {

  @Input()
  phone: string

  constructor() {
  }
}
