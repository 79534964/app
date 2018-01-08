import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {Factorys} from '../../../theme/factorys';

import {MaterielService} from '../../../service/oprative/materiel-service';

@Component({
  templateUrl: 'materiel.html',
  providers: [MaterielService]
})
export class OperativeMateriel {
  private machine = {};
  private materiel = [];

  constructor(public app: App, public navParams: NavParams, public factorys: Factorys, public materielService: MaterielService) {
    this.machine = navParams.get('params');
    factorys.showLoading();
    this.doRefresh();
  }

  // 下拉刷新
  doRefresh(refresher = null) {
    this.materielService.post({machineId: this.machine['id']}).then((data) => {
      refresher && refresher.complete();
      this.materiel = data['content'];
    });
  }
}
