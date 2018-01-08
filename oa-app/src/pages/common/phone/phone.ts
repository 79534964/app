import {Component, Input} from '@angular/core';
// import {CallNumber} from '@ionic-native/call-number';
// import {SMS} from '@ionic-native/sms';

@Component({
  selector: 'CommonPhone',
  templateUrl: 'phone.html'
})
export class CommonPhone {

  @Input()
  phone: string

  constructor() {
  }

  // cellPhone(phone) {
  //   this.callNumber.callNumber(phone, true);
  // }
  //
  // cellSms(phone) {
  //   this.sms.send(phone, '', {android: {intent: 'INTENT'}});
  // }
}
