import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, Slides} from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
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
    this.navCtrl.push(TabsPage);
  }
  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Ados, ulertuta!";
      
  }
}
