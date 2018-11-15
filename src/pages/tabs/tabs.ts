import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsPage } from '../news/news';

import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = NewsPage;
  tab3Root = EventsPage;
  tab4Root = SettingsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
