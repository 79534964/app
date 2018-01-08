import {Component} from '@angular/core';
import {NavParams, ModalController} from 'ionic-angular'

import {CommonSlides} from '../../../../common/slides/slides';

@Component({
  templateUrl: 'repairInfo.html',
  providers: []
})
export class OperatetiveTaskRepairRepairInfo {
  private repair = {};

  constructor(public navParams: NavParams, public modalCtrl: ModalController) {
    this.repair = navParams.get('params');
  }

  openSlides(img) {
    let modal = this.modalCtrl.create(CommonSlides, {img});
    modal.present();
  }
}
