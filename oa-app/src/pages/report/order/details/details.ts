import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'details.html'
})
export class ReportOrderdetails {
  private item = {};

  constructor(public navParams: NavParams) {
    this.item = navParams.get('item');
  }
}
