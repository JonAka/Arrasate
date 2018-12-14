import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { LoginPage } from '../login/login';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Itxi";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  skip() {
    this.navCtrl.push(LoginPage);
  }
  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Ados, ulertuta!";

  }
}
