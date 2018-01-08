import {Component} from '@angular/core';
import {App, ModalController} from 'ionic-angular';
import {Factorys} from '../../../theme/factorys';
import {MachineListService} from '../../../service/count/machine-list-service';
import {MachineSalaService} from '../../../service/count/machine-sala-service';

import {CommonDate} from '../../common/date/date';
import {CountLinechar} from '../linechar/linechar';

@Component({
  templateUrl: 'machine.html',
  providers: [MachineListService, MachineSalaService]
})
export class CountMachine {
  private startDate = new Date();
  private endDate = new Date();
  private searchValue = '';
  private total;
  private pet = 'day';
  private list = [];
  private searchList = [];

  constructor(public app: App, public modalCtrl: ModalController, public machineService: MachineListService, public totalService: MachineSalaService, public factorys: Factorys) {
    this.actionHttp();
  }

  actionHttp() {
    this.searchValue = '';
    if (this.pet) {
      this.endDate = new Date();
      this.startDate = this.factorys.getSelectDate(this.pet);
    }
    this.factorys.showLoading();
    Promise.all([
      this.machineService.post({
        startDate: this.startDate,
        endDate: this.endDate
      }),
      this.totalService.post({
        startDate: this.startDate,
        endDate: this.endDate
      })
    ]).then((data)=> {
      this.list = data[0]['content'];
      this.total = data[1]['content'];
      this.initializelist();
    });
  }

  getDateStr(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  showModal() {
    let profileModal = this.modalCtrl.create(CommonDate);
    profileModal.onDidDismiss((data) => {
      if (data) {
        this.pet = '';
        this.endDate = data.endDate;
        this.startDate = data.startDate;
        this.actionHttp();
      }
    });
    profileModal.present();
  }

  initializelist() {
    this.searchList = this.list;
  }

  getMchine(ev) {
    this.initializelist();
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.searchList = this.searchList.filter((item) => {
        return (item.machineName.indexOf(val) > -1);
      });
    }
  }

  pushPage(machineId) {
    this.app.getRootNav().push(CountLinechar, {
      type: 'machine',
      startDate: this.startDate,
      endDate: this.endDate,
      id: machineId
    });
  }
}
