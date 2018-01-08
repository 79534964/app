import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ErrorService} from '../../../service/index/error-list-service';

@Component({
  templateUrl: 'error.html',
  providers: [ErrorService]
})
export class IndexError {
  private list = [];
  private selectCity = [];
  private checkedCity = [];
  private copyList = [];
  private interval = null;

  constructor(public navParams: NavParams, public errorService: ErrorService) {
    this.changeCityList(navParams.get('params'));
    this.selectBtn();
    this.interval = setInterval(()=> {
      this.doRefresh();
    }, 1000 * 60 * 5);
  }

  // 选择完城市
  selectBtn() {
    if (this.checkedCity.length > 0) {
      this.list = this.copyList.filter((item) => {
        let flag = false;
        for (let city of this.checkedCity) {
          if (city === item.city) {
            flag = true;
          }
        }
        return flag;
      });
    } else {
      this.list = this.copyList;
    }
  }

  // 将城市为null的这是为暂无
  changeCityList(list) {
    this.list = list;
    this.copyList = list;
    // 取出城市
    this.selectCity = [];
    this.copyList.map((item) => {
      let flag = true;
      for (let city of this.selectCity) {
        if (city === item.city || item.city === null) {
          flag = false;
          return false;
        }
      }
      if (flag) {
        this.selectCity.push(item.city);
      }
    });
  }

  // 下拉刷新
  doRefresh(refresher = null) {
    this.errorService.post().then((data) => {
      this.changeCityList(data['content']);
      this.selectBtn();
      setTimeout(()=> {
        if (refresher) {
          refresher.complete();
        }
      }, 500);
    });
  }

  ionViewDidLeave() {
    window.clearInterval(this.interval);
  }
}
