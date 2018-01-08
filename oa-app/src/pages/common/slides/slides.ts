import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'slides.html'
})
export class CommonSlides {

  private img = [];

  constructor(public params: NavParams) {
    this.img = params.get('img').split(',');
  }
}
